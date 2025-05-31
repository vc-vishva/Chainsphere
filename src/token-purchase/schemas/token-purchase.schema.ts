import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, SchemaTypes, HydratedDocument } from 'mongoose';

@Schema({ timestamps: false, collection: 'purchase-orders' })
export class PurchaseOrder {
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
  tokenAmount: number;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  currency: string;

  @Prop({
    type: SchemaTypes.Number,
    required: true,
  })
  usdValue: number;

  @Prop({
    type: SchemaTypes.String,
    required: true,
    enum: ['pending', 'confirmed'],
  })
  status: string;

  @Prop({
    type: SchemaTypes.Date,
    default: Date.now,
  })
  createdAt: Date;
}

/**
 * @ignore
 */
export const PurchaseOrderSchema = SchemaFactory.createForClass(PurchaseOrder);
export type PurchaseOrderDocument = HydratedDocument<PurchaseOrder>;
