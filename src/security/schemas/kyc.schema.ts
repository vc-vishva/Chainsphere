import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, SchemaTypes, HydratedDocument } from 'mongoose';

@Schema({ timestamps: true, collection: 'kyc' })
export class Kyc {
  _id: Types.ObjectId;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
  })
  userId: Types.ObjectId;

  @Prop({
    type: SchemaTypes.String,
  })
  documentType: string;

  @Prop({
    type: SchemaTypes.String,
  })
  documentUrl: string;

  @Prop({
    type: SchemaTypes.String,
    default: 'pending',
  })
  status: string;
}

/**
 * @ignore
 */
export const KycSchema = SchemaFactory.createForClass(Kyc);
export type KycDocument = HydratedDocument<Kyc>;
