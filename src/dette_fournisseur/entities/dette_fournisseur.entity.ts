import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MSchema } from "mongoose";
import { Fournisseur } from "src/fournisseur/entities/fournisseur.entity";

export type DetteFournisseurDocument = HydratedDocument<DetteFournisseur>;

@Schema({timestamps:true})
export class DetteFournisseur {
    _id: string;

    @Prop({type:Date,required: true})
    date: Date;

    @Prop({type:MSchema.Types.ObjectId,ref:Fournisseur.name,required: true})
    fournisseur: string;

    @Prop({type:Number,required: true})
    montant: number;
}

export const DetteFournisseurSchema = SchemaFactory.createForClass(DetteFournisseur);

