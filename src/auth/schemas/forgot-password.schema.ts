import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Defaults } from '../../common/configs/default.config';
import { User } from '../../user/schemas/user.schema';

@Schema({ timestamps: true })
export class ForgotPassword {
  _id: Types.ObjectId;

  @Prop({ type: SchemaTypes.String, required: true })
  token: string;

  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: User.name })
  userId: Types.ObjectId;

  @Prop({
    type: SchemaTypes.Date,
    expires: Defaults.RESET_TOKEN_EXPIRY,
  })
  createdAt: Date;

  @Prop({ type: SchemaTypes.Date })
  updatedAt: Date;
}

export const forgotPasswordSchema = SchemaFactory.createForClass(ForgotPassword);
export type ForgotPasswordDocument = HydratedDocument<ForgotPassword>;
