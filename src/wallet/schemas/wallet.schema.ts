import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, SchemaTypes, HydratedDocument } from 'mongoose';

@Schema({ timestamps: true, collection: 'wallets' })
export class Wallet {
  _id: Types.ObjectId;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
  })
  userId: Types.ObjectId;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  address: string;

  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  cspBalance: number;

  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  investmentBalance: number;
}

/**
 * @ignore
 */
export const WalletSchema = SchemaFactory.createForClass(Wallet);
export type WalletDocument = HydratedDocument<Wallet>;
