import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, SchemaTypes, HydratedDocument } from 'mongoose';

@Schema({ timestamps: true, collection: 'referrals' })
export class Referral {
  _id: Types.ObjectId;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
  })
  userId: Types.ObjectId;

  @Prop({
    type: SchemaTypes.ObjectId,
  })
  referrerId: Types.ObjectId;

  @Prop({
    type: [SchemaTypes.ObjectId],
    default: [],
  })
  children: Types.ObjectId[];

  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  directBusiness: number;

  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  totalBusiness: number;

  @Prop({ type: SchemaTypes.Boolean, default: false })
  isAmbassador: boolean;
}

/**
 * @ignore
 */
export const ReferralSchema = SchemaFactory.createForClass(Referral);
export type ReferralDocument = HydratedDocument<Referral>;
