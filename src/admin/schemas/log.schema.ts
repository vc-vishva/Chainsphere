import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'logs' })
export class Log {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true })
  level: 'info' | 'warn' | 'error' | 'debug';

  @Prop({ required: true })
  message: string;

  @Prop()
  context?: string; // Optional context of the log, e.g. class or module name

  @Prop({ type: Object })
  request: Record<string, unknown>;

  @Prop({ type: Object })
  responseData?: Record<string, unknown>;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export type LogDocument = Log & Document;
export const LogSchema = SchemaFactory.createForClass(Log);
