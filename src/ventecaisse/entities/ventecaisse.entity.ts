import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VentecaisseDocument = HydratedDocument<Ventecaisse>;

@Schema()
export class ProduitVenteCaisse {
  @Prop({ type: String, required: true })
  nom: string;

  @Prop({ type: Number, required: true })
  quantite: number;

  @Prop({ type: Number, required: true })
  prixUnitaire: number;

  @Prop({ type: Number, required: true })
  montant: number;
}

export const ProduitVenteCaisseSchema =
  SchemaFactory.createForClass(ProduitVenteCaisse);

@Schema({ timestamps: true })
export class Ventecaisse {
  _id: string;

  @Prop({ type: Date, default: Date.now })
  date: Date;

  @Prop({ type: [ProduitVenteCaisseSchema], required: true })
  produits: ProduitVenteCaisse[];

  @Prop({ type: Number, required: true })
  montantTotal: number;
}

export const VentecaisseSchema = SchemaFactory.createForClass(Ventecaisse);
