import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { RoleEnum } from '../types';

@Schema({ timestamps: true, collection: 'user' })
export class User {
  _id: Types.ObjectId;

  @Prop({
    type: SchemaTypes.String,
  })
  firstName: string;

  @Prop({
    type: SchemaTypes.String,
  })
  lastName: string;


  @Prop({ type: SchemaTypes.String, required: true })
  email: string;

  @Prop({ type: SchemaTypes.String, required: true, select: false })
  password: string;

  @Prop({ type: SchemaTypes.Boolean, default: true })
  emailVerified: boolean;

  @Prop({ enum: RoleEnum, type: SchemaTypes.String })
  userType: RoleEnum;

  @Prop({ type: SchemaTypes.String })
  phoneNumber: string;

 
  @Prop({ type: SchemaTypes.String, default: '' })
  profilePicture: string;

  validatePassword: (password: string) => Promise<boolean>;
}
/**
 * @ignore
 */
export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = HydratedDocument<User>;
