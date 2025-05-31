import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, SchemaTypes, HydratedDocument } from 'mongoose';

@Schema({ timestamps: false, collection: 'transactions' })
export class Transaction {
  _id: Types.ObjectId;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
  })
  userId: Types.ObjectId;

  @Prop({
    type: SchemaTypes.Number,
    required: true,
  })
  amount: number;

  @Prop({
    type: SchemaTypes.String,
    required: true,
    enum: ['purchase', 'withdrawal'],
  })
  type: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  currency: string;

  @Prop({
    type: SchemaTypes.Date,
    default: Date.now,
  })
  date: Date;
}

/**
 * @ignore
 */
export const TransactionSchema = SchemaFactory.createForClass(Transaction);
export type TransactionDocument = HydratedDocument<Transaction>;
