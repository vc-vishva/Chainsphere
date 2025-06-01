import { Injectable, BadRequestException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SalePhase, SalePhaseDocument } from 'src/ico-phase/schemas/SalePhase.schema';
import { StartSaleDto, ExtendSaleDto, EndSaleDto } from './dtos/sale.dto';
import { Referral, ReferralDocument } from 'src/referral/schemas/referral.schema';
import { successMessages } from 'src/common/configs/messages.config';
import { ResponseHandler } from 'src/utils/response-handler';

@Injectable()
export class AdminSaleService {
  constructor(
    @InjectModel(SalePhase.name) private readonly salePhaseModel: Model<SalePhaseDocument>,
    @InjectModel(Referral.name) private readonly referralModel: Model<ReferralDocument>,
  ) {}

 async startSale( userId: Types.ObjectId, dto: StartSaleDto): Promise<object> {
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

  if (overlapping) {
    throw new BadRequestException('Overlapping or active sale phase exists');
  }

  const salePhase = await this.salePhaseModel.create({
    ...dto,
    isActive: true,
    sold: 0,
  });

  return ResponseHandler.success(
    { data: salePhase },
    successMessages.SUCCESSFULLY_CREATED, 
    HttpStatus.CREATED,
  );
}

async extendSale( userId: Types.ObjectId,dto: ExtendSaleDto): Promise<any> {
  const sale = await this.salePhaseModel.findById(dto.salePhaseId);
  if (!sale) throw new BadRequestException('Sale phase not found');
  if (!sale.isActive) throw new BadRequestException('Cannot extend inactive phase');
  if (new Date(dto.newEndDate) <= sale.endDate)
    throw new BadRequestException('New end date must be after current');

  sale.endDate = new Date(dto.newEndDate);
  await sale.save();

  return ResponseHandler.success(
    { data: sale },
    successMessages.SALE_PHASE_EXTENDED, // Define this message in your constants
    HttpStatus.OK,
  );
}


 async endSale(dto: EndSaleDto): Promise<object> {
  const sale = await this.salePhaseModel.findById(dto.salePhaseId);
  if (!sale) throw new BadRequestException('Sale phase not found');

  sale.isActive = false;
  sale.endDate = new Date(); // Optional: End immediately
  await sale.save();

  return ResponseHandler.success(
    { data: sale },
    successMessages.SALE_PHASE_ENDED, // Define this in your messages file
    HttpStatus.OK,
  );

}
  async getReferralOverview(): Promise<object> {
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

  const data = aggregation.length
    ? aggregation[0]
    : {
        totalReferrals: 0,
        totalDirectBusiness: 0,
        totalTreeBusiness: 0,
      };

  return ResponseHandler.success(
    { data },
    successMessages.REFERRAL_OVERVIEW_FETCHED, // Define this message constant
    HttpStatus.OK,
  );
}

 async getTokenDistribution(): Promise<object> {
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

  const data = aggregation.length
    ? aggregation[0]
    : {
        totalTokenCap: 0,
        totalSold: 0,
        totalRemaining: 0,
        phases: [],
      };

  return ResponseHandler.success(
    { data },
    successMessages.TOKEN_DISTRIBUTION_FETCHED, // Define this message in your constants
    HttpStatus.OK,
  );
}
}
