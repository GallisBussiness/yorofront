import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Dette } from "src/dette/entities/dette.entity";

export type PaiementClientDocument = HydratedDocument<PaiementClient>;

@Schema({timestamps:true})
export class PaiementClient {
    _id: string;

    @Prop({type:Date,required: true})
    date: Date;

    @Prop({type:Types.ObjectId,ref:Dette.name,required: true})
    dette: string;

    @Prop({type:Number,required: true})
    montant: number;
}

export const PaiementClientSchema = SchemaFactory.createForClass(PaiementClient);