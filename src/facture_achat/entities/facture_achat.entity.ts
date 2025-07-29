import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type FactureAchatDocument = HydratedDocument<FactureAchat>;

@Schema({timestamps: true})
export class FactureAchat {
    @Prop({type: String})
    ref: string;

    @Prop({type: Number,required: true})
    ht: number;

    @Prop({type: Date,required: true})
    date_echeance: string;

    @Prop({type: Number,required: true,default:0 })
    taxe: number;

    @Prop({type:Types.ObjectId,ref:'user',required: true})
    user: string;
}

export const FactureAchatSchema = SchemaFactory.createForClass(FactureAchat);