import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type FamilleDocument = HydratedDocument<Famille>;

@Schema({timestamps: true})
export class Famille {
 @Prop({type: String,required: true,unique: true})
 nom: string;

 @Prop({type: Types.ObjectId,ref: 'user',required: true})
 userId: string;
}

export const FamilleSchema = SchemaFactory.createForClass(Famille);