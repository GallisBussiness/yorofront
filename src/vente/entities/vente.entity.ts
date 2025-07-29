import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Client } from "src/client/entities/client.entity";

export type VenteDocument = HydratedDocument<Vente>

@Schema({timestamps: true})
export class Vente {
  _id: string;

  @Prop({type: String})
  ref: string;

  @Prop({type:Date,required: true})
  date: Date;

  @Prop({type: Array, required: true})
  produits: any[];

  @Prop({type:Number,required: true})
  montant: number;

  @Prop({type:Number,required: true})
  remise: number;

  @Prop({type:Number,required: true})
  net_a_payer: number;

  @Prop({type:Types.ObjectId,ref:Client.name,required: true,autopopulate:true})
  client: string | Client;

  @Prop({type:Types.ObjectId,ref:'user',required: true})
  userId: string;
}

export const VenteSchema = SchemaFactory.createForClass(Vente);