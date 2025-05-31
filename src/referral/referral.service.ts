import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { GenerateReferralDto } from './dtos/referral.dto';
import { Referral, ReferralDocument } from './schemas/referral.schema';

@Injectable()
export class ReferralService {
    constructor(
    @InjectModel(Referral.name) private referralModel: Model<ReferralDocument>,
  ) {}

  async generateReferralLink(dto: GenerateReferralDto) {
    // Check if referral already exists
    const existing = await this.referralModel.findOne({ userId: dto.userId });

    if (existing) {
      return {
        referralLink: `https://yourdomain.com/signup?ref=${dto.userId}`,
        referral: existing,
      };
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

    return {
      referralLink: `https://yourdomain.com/signup?ref=${dto.userId}`,
      referral,
    };
  }

  async getReferralTree(userId: string) {
    const referral = await this.referralModel.findOne({ userId: new Types.ObjectId(userId) });

    if (!referral) {
      throw new NotFoundException('Referral record not found');
    }

    const children = await this.referralModel.find({ _id: { $in: referral.children } });

    return {
      userId: referral.userId,
      referrerId: referral.referrerId,
      children: children.map((child) => ({
        _id: child._id,
        userId: child.userId,
        directBusiness: child.directBusiness,
        totalBusiness: child.totalBusiness,
      })),
    };
  }

   async getReferralVolume(userId: string) {
    const referral = await this.referralModel.findOne({
      userId: new Types.ObjectId(userId),
    });

    if (!referral) {
      throw new NotFoundException('Referral record not found');
    }

    return {
      userId: referral.userId,
      directBusiness: referral.directBusiness,
      totalBusiness: referral.totalBusiness,
    };
  }

  async getAmbassadorStatus(userId: string) {
    const referral = await this.referralModel.findOne({
      userId: new Types.ObjectId(userId),
    });

    if (!referral) {
      throw new NotFoundException('Referral record not found');
    }

    // Define your ambassador criteria here, e.g., directBusiness or totalBusiness >= threshold
    const isAmbassador =
      referral.directBusiness >= 10000 || referral.totalBusiness >= 50000;

    return {
      userId: referral.userId,
      isAmbassador,
      directBusiness: referral.directBusiness,
      totalBusiness: referral.totalBusiness,
    };
  }
}
