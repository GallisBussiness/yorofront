import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { DetteFournisseur } from "src/dette_fournisseur/entities/dette_fournisseur.entity";

export type PaiementDetteFournisseurDocument = HydratedDocument<PaiementDetteFournisseur>;

@Schema({timestamps:true})
export class PaiementDetteFournisseur {
    _id: string;

    @Prop({type:Date,required: true})
    date: Date;

    @Prop({type:Types.ObjectId,ref:DetteFournisseur.name,required: true})
    dette: string;

    @Prop({type:Number,required: true})
    montant: number;
}

export const PaiementDetteFournisseurSchema = SchemaFactory.createForClass(PaiementDetteFournisseur);
