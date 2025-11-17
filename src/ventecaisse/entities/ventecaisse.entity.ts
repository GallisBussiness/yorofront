import { Prop, Schema,SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type VentecaisseDocument = HydratedDocument<Ventecaisse> ;

@Schema({timestamps:true})
export class Ventecaisse {
    @Prop({type:Number,required:true})
    montant:number;

    @Prop({type:Date,required:true})
    date:Date;
}

export const VentecaisseSchema = SchemaFactory.createForClass(Ventecaisse);

