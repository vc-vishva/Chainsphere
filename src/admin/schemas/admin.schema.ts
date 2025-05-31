import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, SchemaTypes, HydratedDocument } from 'mongoose';

@Schema({ timestamps: true, collection: 'admins' })
export class Admin {
  _id: Types.ObjectId;

  @Prop({
    type: SchemaTypes.String,
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  password: string;

  @Prop({
    type: SchemaTypes.String,
    default: 'admin',
  })
  role: string;
}

/**
 * @ignore
 */
export const AdminSchema = SchemaFactory.createForClass(Admin);
export type AdminDocument = HydratedDocument<Admin>;
