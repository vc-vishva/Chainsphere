import { Module } from '@nestjs/common';
import { ReferralService } from './referral.service';
import { ReferralController } from './referral.controller';
import { Referral, ReferralSchema } from './schemas/referral.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{ name: Referral.name, schema: ReferralSchema }])],
  controllers: [ReferralController],
  providers: [ReferralService],
})
export class ReferralModule {}
