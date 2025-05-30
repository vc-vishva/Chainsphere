import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, SchemaTypes, HydratedDocument } from "mongoose";
import { User } from "src/user/schemas/user.schema";

@Schema({ timestamps: true, collection: 'transactions' })
export class Transactions {
  _id: Types.ObjectId;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  currency: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  notes: string;

   @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  createdBy: Types.ObjectId;
 
}
/**
 * @ignore
 */
export const TransactionsSchema = SchemaFactory.createForClass(Transactions);
export type TransactionsDocument = HydratedDocument<Transactions>;