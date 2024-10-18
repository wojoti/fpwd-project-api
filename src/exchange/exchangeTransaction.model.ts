import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExchangeTransactionDocument = ExchangeTransaction & Document;

@Schema({
  timestamps: true,
})
export class ExchangeTransaction extends Document {
  @Prop({ required: true })
  rate: number;

  @Prop({ required: true })
  from: string;

  @Prop({ required: true })
  to: string;

  @Prop({ required: true })
  amountFrom: number;

  @Prop({ required: true })
  amountTo: number;

  @Prop({ required: false })
  createdAt: Date;

  @Prop({ required: false })
  updatedAt: Date;
}

export const ExchangeTransactionSchema =
  SchemaFactory.createForClass(ExchangeTransaction);
