import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type VenteSimpleDocument = HydratedDocument<VenteSimple>;

@Schema({ timestamps: true })
export class VenteSimple {
  _id: string;

  @Prop({ type: String, required: true, unique: true })
  ref: string;

  @Prop({ type: Number, required: true })
  montant: number;

  @Prop({ type: Date, required: true, default: Date.now })
  date: Date;

  @Prop({ type: String, required: false, maxlength: 500 })
  note?: string;

  @Prop({ type: Types.ObjectId, ref: 'user', required: true, index: true })
  userId: string;
}

export const VenteSimpleSchema = SchemaFactory.createForClass(VenteSimple);

VenteSimpleSchema.index({ userId: 1, date: -1 });
