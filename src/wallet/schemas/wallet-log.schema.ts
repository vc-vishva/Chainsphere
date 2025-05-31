import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types, HydratedDocument } from 'mongoose';

@Schema({ timestamps: true, collection: 'wallet-logs' })
export class WalletLog {
  _id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, required: true })
  userId: Types.ObjectId;

  @Prop({ type: String, enum: ['deposit', 'withdrawal', 'reward'], required: true })
  type: string;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: String })
  description: string;
}

export const WalletLogSchema = SchemaFactory.createForClass(WalletLog);
export type WalletLogDocument = HydratedDocument<WalletLog>;
