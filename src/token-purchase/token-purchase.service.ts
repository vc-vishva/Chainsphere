import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { successMessages } from 'src/common/configs/messages.config';
import { SalePhase, SalePhaseDocument } from 'src/ico-phase/schemas/SalePhase.schema';
import { ResponseHandler } from 'src/utils/response-handler';
import { PurchaseDto } from './dtos/purchase.dto';
import { PurchaseOrder, PurchaseOrderDocument } from './schemas/token-purchase.schema';
import { Referral, ReferralDocument } from 'src/referral/schemas/referral.schema';

@Injectable()
export class TokenPurchaseService {
    constructor(
    @InjectModel(SalePhase.name)
    private readonly salePhaseModel: Model<SalePhaseDocument>,
    @InjectModel(Referral.name)
    private readonly referralModel: Model<ReferralDocument>,
    @InjectModel(PurchaseOrder.name)
    private readonly purchaseOrderModel: Model<PurchaseOrderDocument>,
  ) {}

  async purchaseToken(dto: PurchaseDto) {
  const session = await this.salePhaseModel.db.startSession();
  session.startTransaction();

  const currentDate = new Date();

  // Find active phase (as before)
  const activePhase = await this.salePhaseModel.findOne({
    isActive: true,
    startDate: { $lte: currentDate },
    endDate: { $gte: currentDate },
  }, null, { session });

  if (!activePhase) {
    await session.abortTransaction();
    session.endSession();
    throw new BadRequestException('No active sale phase found');
  }

  // Check token cap etc (same as before)
  const remaining = (activePhase.sold || 0) - dto.tokenAmount;
  if (dto.tokenAmount > remaining) {
    await session.abortTransaction();
    session.endSession();
    throw new BadRequestException(`Only ${remaining} tokens are available`);
  }

  // Fetch USD price from CoinGecko
  const coin = dto.currency.toLowerCase();
  const priceRes = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`);
  const usdPerUnit = priceRes.data[coin]?.usd;
  if (!usdPerUnit) {
    await session.abortTransaction();
    session.endSession();
    throw new BadRequestException('Failed to fetch USD price');
  }

  const usdValue = activePhase.price * dto.tokenAmount;

  // Create purchase order
  const order = await this.purchaseOrderModel.create([{
    userId: dto.userId,
    tokenAmount: dto.tokenAmount,
    currency: dto.currency.toUpperCase(),
    usdValue,
    status: 'confirmed',
    createdAt: new Date(),
  }], { session });

  // Update sale phase sold count and status
  const updatedSold = (activePhase.sold || 0) + dto.tokenAmount;

  await this.salePhaseModel.updateOne(
    { _id: activePhase._id },
    {
      $inc: { sold: dto.tokenAmount },
      ...(updatedSold >= activePhase.tokenCap ? { isActive: false } : {}),
    },
    { session },
  );

  if (updatedSold >= activePhase.tokenCap) {
    await this.salePhaseModel.updateOne(
      { isActive: false, startDate: { $gt: activePhase.startDate } },
      { $set: { isActive: true } },
      { session },
    );
  }

  // ===== REFERRAL UPDATES =====

  // Number of referral levels to update
  const MAX_LEVELS = 3;

  // Fetch referral record of buyer
  let referral = await this.referralModel.findOne({ userId: dto.userId }).session(session);

  for (let level = 1; level <= MAX_LEVELS && referral?.referrerId; level++) {
    const referrerId = referral.referrerId;

    // Fetch referrer referral document
    const referrerReferral = await this.referralModel.findOne({ userId: referrerId }).session(session);
    if (!referrerReferral) break;

    if (level === 1) {
      // Direct reward - 10% of usdValue added to directBusiness
      const directReward = usdValue * 0.1;

      await this.referralModel.updateOne(
        { userId: referrerId },
        {
          $inc: {
            directBusiness: directReward,
            totalBusiness: usdValue,
          },
          $push: { children: dto.userId }, // optionally track children
        },
        { session },
      );
    } else {
      // For indirect uplines, just increment totalBusiness by usdValue
      await this.referralModel.updateOne(
        { userId: referrerId },
        {
          $inc: { totalBusiness: usdValue },
        },
        { session },
      );
    }

    // Unlock ambassador if criteria met
    if (referrerReferral.totalBusiness + usdValue >= 75000) {
      // You can add a flag or other logic to mark ambassador status
      // For example, add an isAmbassador boolean prop in Referral schema
      await this.referralModel.updateOne(
        { userId: referrerId },
        { $set: { isAmbassador: true } },
        { session },
      );
    }

    referral = referrerReferral; // move up the tree
  }

  await session.commitTransaction();
  session.endSession();

  return ResponseHandler.success(order[0], successMessages.SUCCESSFULLY_CREATED, HttpStatus.CREATED);
}


}
