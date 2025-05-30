import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Defaults } from '../../common/configs/default.config';
import { User } from '../../user/schemas/user.schema';

@Schema({ timestamps: true })
export class EmailVerify {
  _id: Types.ObjectId;

  @Prop({ type: SchemaTypes.String, required: true })
  token: string;

  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: User.name })
  userId: Types.ObjectId;

  @Prop({
    type: SchemaTypes.Date,
    expires: Defaults.EMAIL_VERIFICATION_TOKEN_EXPIRY,
  })
  createdAt: Date;

  @Prop({ type: SchemaTypes.Date })
  updatedAt: Date;
}

export const emailVerifySchema = SchemaFactory.createForClass(EmailVerify);
export type EmailVerifyDocument = HydratedDocument<EmailVerify>;
