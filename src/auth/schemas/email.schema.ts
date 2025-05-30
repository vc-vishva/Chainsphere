import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'lead' })
export class Lead {
  _id: Types.ObjectId;

  @Prop({ type: SchemaTypes.String, required: true })
  email: string;
}
/**
 * @ignore
 */
export const LeadSchema = SchemaFactory.createForClass(Lead);
export type LeadDocument = HydratedDocument<Lead>;
