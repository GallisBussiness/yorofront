import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Achat } from "src/achat/entities/achat.entity";
import { Fournisseur } from "src/fournisseur/entities/fournisseur.entity";

export type PaiementFournisseurDocument = HydratedDocument<PaiementFournisseur>;

@Schema({timestamps:true})
export class PaiementFournisseur {
    _id: string;

    @Prop({type:Date,required: true})
    date: Date;

    @Prop({type:Types.ObjectId,ref:Achat.name,required: true})
    achat: string;

    @Prop({type:Types.ObjectId,ref:Fournisseur.name,required: true})
    fournisseur: string;

    @Prop({type:Number,required: true})
    montant: number;
}   

export const PaiementFournisseurSchema = SchemaFactory.createForClass(PaiementFournisseur);
