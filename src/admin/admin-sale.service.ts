import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SalePhase, SalePhaseDocument } from 'src/ico-phase/schemas/SalePhase.schema';
import { StartSaleDto, ExtendSaleDto, EndSaleDto } from './dtos/sale.dto';
import { Referral, ReferralDocument } from 'src/referral/schemas/referral.schema';

@Injectable()
export class AdminSaleService {
  constructor(
    @InjectModel(SalePhase.name) private readonly salePhaseModel: Model<SalePhaseDocument>,
    @InjectModel(Referral.name) private readonly referralModel: Model<ReferralDocument>,
  ) {}

  async startSale(dto: StartSaleDto) {
    const overlapping = await this.salePhaseModel.findOne({
      $or: [
        { isActive: true },
        {
          $and: [
            { startDate: { $lte: new Date(dto.endDate) } },
            { endDate: { $gte: new Date(dto.startDate) } },
          ],
        },
      ],
    });

    if (overlapping) throw new BadRequestException('Overlapping or active sale phase exists');

    const salePhase = await this.salePhaseModel.create({
      ...dto,
      isActive: true,
      sold: 0,
    });

    return { message: 'Sale phase started', data: salePhase };
  }

  async extendSale(dto: ExtendSaleDto) {
    const sale = await this.salePhaseModel.findById(dto.salePhaseId);
    if (!sale) throw new BadRequestException('Sale phase not found');
    if (!sale.isActive) throw new BadRequestException('Cannot extend inactive phase');
    if (new Date(dto.newEndDate) <= sale.endDate)
      throw new BadRequestException('New end date must be after current');

    sale.endDate = new Date(dto.newEndDate);
    await sale.save();

    return { message: 'Sale phase extended', data: sale };
  }

  async endSale(dto: EndSaleDto) {
    const sale = await this.salePhaseModel.findById(dto.salePhaseId);
    if (!sale) throw new BadRequestException('Sale phase not found');

    sale.isActive = false;
    sale.endDate = new Date(); // Optional: End now
    await sale.save();

    return { message: 'Sale phase ended', data: sale };
  }

  async getReferralOverview() {
    const aggregation = await this.referralModel.aggregate([
      {
        $group: {
          _id: null,
          totalReferrals: { $sum: 1 },
          totalDirectBusiness: { $sum: '$directBusiness' },
          totalTreeBusiness: { $sum: '$totalBusiness' },
        },
      },
      {
        $project: {
          _id: 0,
          totalReferrals: 1,
          totalDirectBusiness: 1,
          totalTreeBusiness: 1,
        },
      },
    ]);

    // If no referrals found, return zeros
    if (!aggregation.length) {
      return {
        totalReferrals: 0,
        totalDirectBusiness: 0,
        totalTreeBusiness: 0,
      };
    }

    return aggregation[0];
  }

  async getTokenDistribution() {
    // Aggregate total sold and total cap
    const aggregation = await this.salePhaseModel.aggregate([
      {
        $group: {
          _id: null,
          totalTokenCap: { $sum: '$tokenCap' },
          totalSold: { $sum: '$sold' },
          phases: {
            $push: {
              phaseId: '$_id',
              name: '$name',
              tokenCap: '$tokenCap',
              sold: '$sold',
              isActive: '$isActive',
              startDate: '$startDate',
              endDate: '$endDate',
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalTokenCap: 1,
          totalSold: 1,
          totalRemaining: { $subtract: ['$totalTokenCap', '$totalSold'] },
          phases: 1,
        },
      },
    ]);

    if (!aggregation.length) {
      return {
        totalTokenCap: 0,
        totalSold: 0,
        totalRemaining: 0,
        phases: [],
      };
    }

    return aggregation[0];
  }
}
