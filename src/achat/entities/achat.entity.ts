import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Depot } from "src/depot/entities/depot.entity";
import { Fournisseur } from "src/fournisseur/entities/fournisseur.entity";

export type AchatDocument = HydratedDocument<Achat>

@Schema({timestamps:true})
export class Achat {
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

    @Prop({type:Types.ObjectId,ref:Fournisseur.name,required: true, autopopulate:true})
    fournisseur: string | Fournisseur;

    @Prop({type:Types.ObjectId,ref:'user',required: true})
    userId: string;

    @Prop({type:Types.ObjectId,ref:Depot.name,required: false, autopopulate:true})
    depot: string | Depot;
}

export const AchatSchema = SchemaFactory.createForClass(Achat);


