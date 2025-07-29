import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Client } from "src/client/entities/client.entity";
import { Vente } from "src/vente/entities/vente.entity";

export type FactureVenteDocument = HydratedDocument<FactureVente>;

@Schema({timestamps: true})
export class FactureVente {
    @Prop({type: String})
    ref: string;

    @Prop({type: Date,required: true})
    date: string;

    @Prop({type: Types.ObjectId,ref:Client.name,required: true,autopopulate:true})
    client: Client | string;

    @Prop({type: Types.ObjectId,ref:Vente.name,required: true,autopopulate:true})
    vente: Vente | string;

    @Prop({type:Types.ObjectId,ref:'user',required: true})
    user: string;
}

export const FactureVenteSchema = SchemaFactory.createForClass(FactureVente);