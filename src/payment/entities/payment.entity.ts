import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { Pack } from "src/pack/entities/pack.entity";

export type PaymentDocument = HydratedDocument<Payment>;

@Schema({timestamps: true})
export class Payment {
    @Prop({type: String,required:true})
    ref: string;

    @Prop({type: Types.ObjectId,ref: Pack.name,required: true})
    pack: Types.ObjectId;
    
    @Prop({type: Types.ObjectId,ref: 'user',required: true})
    user: Types.ObjectId;
    
    @Prop({type: Number,required: true})
    montant: number;
    
    @Prop({type: mongoose.Schema.Types.Date,required: true})
    date_debut: Date;
    
    @Prop({type: mongoose.Schema.Types.Date,required: true})
    date_fin: Date;
    
    @Prop({type: String,enum: ['mensuel', 'trimestriel', 'semestriel'],required: true})
    type_abonnement: string;
    
    @Prop({type: String,enum: ['en_attente', 'valide', 'annule', 'expire'],default: 'en_attente'})
    statut: string;
    
    @Prop({type: String,required: false})
    methode_paiement: string;
    
    @Prop({type: String,required: false})
    transaction_id: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
