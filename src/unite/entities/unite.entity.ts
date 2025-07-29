import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type UniteDocument = HydratedDocument<Unite>;

@Schema({timestamps: true})
export class Unite {
    @Prop({type: String,required: true})
    nom: string;

    @Prop({type: Types.ObjectId,ref: 'user',required: true})
    userId: string;
}

export const UniteSchema = SchemaFactory.createForClass(Unite);