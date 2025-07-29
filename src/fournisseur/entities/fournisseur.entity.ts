import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type FournisseurDocument = HydratedDocument<Fournisseur>;

@Schema({timestamps: true})
export class Fournisseur {
 @Prop({type: String,required: true})
 nom: string;

 @Prop({type: String})
 tel: string;
 @Prop({type: String})
 addr: string; 

 @Prop({type: Types.ObjectId,ref: 'user',required: true})
 userId: string;
}

export const FournisseurSchema = SchemaFactory.createForClass(Fournisseur);