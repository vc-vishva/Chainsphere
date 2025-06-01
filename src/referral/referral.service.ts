import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { GenerateReferralDto } from './dtos/referral.dto';
import { Referral, ReferralDocument } from './schemas/referral.schema';
import { errorMessages, successMessages } from 'src/common/configs/messages.config';
import { ResponseHandler } from 'src/utils/response-handler';

@Injectable()
export class ReferralService {
    constructor(
    @InjectModel(Referral.name) private referralModel: Model<ReferralDocument>,
  ) {}

 

async generateReferralLink(dto: GenerateReferralDto): Promise<object> {
  // Check if referral already exists
  const existing = await this.referralModel.findOne({ userId: dto.userId });

  const referralLink = `https://yourdomain.com/signup?ref=${dto.userId}`;

  if (existing) {
    return ResponseHandler.success(
      {
        data: {
          referralLink,
          referral: existing,
        },
      },
      `Referral link ${errorMessages.ALREADY_AVAILABLE}`,
      HttpStatus.OK,
    );
  }

  const referral = await this.referralModel.create({
    userId: dto.userId,
    referrerId: dto.referrerId || null,
  });

  // Optionally: Add to parent's children
  if (dto.referrerId) {
    await this.referralModel.updateOne(
      { userId: dto.referrerId },
      { $addToSet: { children: referral._id } }
    );
  }

  return ResponseHandler.success(
    {
      data: {
        referralLink,
        referral,
      },
    },
     `Referral link ${successMessages.SUCCESSFULLY_CREATED}`,
    HttpStatus.OK,
  );
}


  async getReferralTree(userId: string): Promise<object> {
  const referral = await this.referralModel.findOne({ userId: new Types.ObjectId(userId) });

  if (!referral) {
    throw new NotFoundException('Referral record not found');
  }

  const children = await this.referralModel.find({ _id: { $in: referral.children } });

  const result = {
    userId: referral.userId,
    referrerId: referral.referrerId,
    children: children.map((child) => ({
      _id: child._id,
      userId: child.userId,
      directBusiness: child.directBusiness,
      totalBusiness: child.totalBusiness,
    })),
  };

  return ResponseHandler.success(
    { data: result },
    `Referral tree ${successMessages.SUCCESSFULLY_FETCHED}`,
    HttpStatus.OK,
  );
}


 async getReferralVolume(userId: string): Promise<object> {
  const referral = await this.referralModel.findOne({
    userId: new Types.ObjectId(userId),
  });

  if (!referral) {
    throw new NotFoundException('Referral record not found');
  }

  const result = {
    userId: referral.userId,
    directBusiness: referral.directBusiness,
    totalBusiness: referral.totalBusiness,
  };

  return ResponseHandler.success(
    { data: result },
    `Referral volume ${successMessages.SUCCESSFULLY_FETCHED}`,
    HttpStatus.OK,
  );
}


  async getAmbassadorStatus(userId: string): Promise<object> {
  const referral = await this.referralModel.findOne({
    userId: new Types.ObjectId(userId),
  });

  if (!referral) {
    throw new NotFoundException('Referral record not found');
  }

  // Ambassador criteria
  const isAmbassador =
    referral.directBusiness >= 10000 || referral.totalBusiness >= 50000;

  const result = {
    userId: referral.userId,
    isAmbassador,
    directBusiness: referral.directBusiness,
    totalBusiness: referral.totalBusiness,
  };

  return ResponseHandler.success(
    { data: result },
    `Ambassador status ${successMessages.SUCCESSFULLY_FETCHED}`,
    HttpStatus.OK,
  );
}
}
