import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { RoleEnum } from '../types';

@Schema({ timestamps: true, collection: 'user' })
export class User {
  _id: Types.ObjectId;

  @Prop({
    type: SchemaTypes.String,
  })
  firstName: string;

  @Prop({
    type: SchemaTypes.String,
  })
  lastName: string;

  @Prop({
    type: SchemaTypes.String,
  })
  merchantName: string;

  @Prop({ type: SchemaTypes.String, required: true })
  email: string;

  @Prop({ type: SchemaTypes.String, required: true, select: false })
  password: string;

  @Prop({ type: SchemaTypes.Boolean, default: true })
  emailVerified: boolean;

  @Prop({ enum: RoleEnum, type: SchemaTypes.String })
  userType: RoleEnum;

  @Prop({ type: SchemaTypes.Boolean, default: false })
  isGuest: boolean;

  @Prop({ type: SchemaTypes.Boolean })
  acceptTerms: boolean;

  @Prop({ type: SchemaTypes.String })
  phoneNumber: string;

  @Prop({ type: SchemaTypes.String })
  streetAddress: string;

  @Prop({ type: SchemaTypes.Number })
  zipCode: number;

  @Prop({ type: SchemaTypes.String })
  city: string;

  @Prop({ type: SchemaTypes.String })
  state: string;

  @Prop({ type: SchemaTypes.String })
  country: string;

  @Prop({ type: SchemaTypes.String, default: '' })
  profilePicture: string;

  @Prop({ type: SchemaTypes.Boolean, default: false })
  link2payStatus: boolean;

  @Prop({ type: SchemaTypes.Boolean, default: false })
  appliedForMerchantApp: boolean;

  @Prop({ type: SchemaTypes.String })
  userDonationPageUrl: string;

  @Prop({ type: SchemaTypes.String, default: 'gettrx' })
  paymentGateway: string;

  @Prop({ type: SchemaTypes.Boolean, default: false })
  isProfileLive: boolean;

  @Prop({ type: SchemaTypes.Boolean })
  isGuestUserSetupPassword: boolean;

  @Prop({ type: SchemaTypes.Boolean, default: false })
  isCelebrationMailSent: boolean;

  @Prop({ type: SchemaTypes.Boolean, default: false })
  availableForCelebration: boolean;

  @Prop({ type: [SchemaTypes.String], default: [] })
  isFormFilled: string[];

  @Prop({ type: SchemaTypes.Boolean, default: false })
  isRegisteredThroughCampaign: boolean;

  validatePassword: (password: string) => Promise<boolean>;
}
/**
 * @ignore
 */
export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = HydratedDocument<User>;
