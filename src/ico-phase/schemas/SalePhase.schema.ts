import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, SchemaTypes, HydratedDocument } from 'mongoose';

@Schema({ timestamps: true, collection: 'sale-phases' })
export class SalePhase {
  _id: Types.ObjectId;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  name: string;

  @Prop({
    type: SchemaTypes.Number,
    required: true,
  })
  price: number;

  @Prop({
    type: SchemaTypes.Number,
    required: true,
  })
  tokenCap: number;

  @Prop({
    type: SchemaTypes.Boolean,
    default: false,
  })
  isActive: boolean;

  @Prop({
    type: SchemaTypes.Date,
    required: true,
  })
  startDate: Date;

  @Prop({
    type: SchemaTypes.Date,
    required: true,
  })
  endDate: Date;
}

/**
 * @ignore
 */
export const SalePhaseSchema = SchemaFactory.createForClass(SalePhase);
export type SalePhaseDocument = HydratedDocument<SalePhase>;
