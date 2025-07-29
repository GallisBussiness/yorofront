import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type ParamDocument = HydratedDocument<Param>

@Schema({timestamps:true})
export class Param {
@Prop({type: String,required: true})
nom:string;

@Prop({type:Number, required: true, default:18})
tva: number;

@Prop({type: String})
logo: string;

@Prop({type: String})
num_siret: string;

@Prop({type:String})
ninea: string;

@Prop({type:String})
email: string;

@Prop({type:String})
tel: string;

@Prop({type:String})
addr: string;

@Prop({type:String})
desc: string;

@Prop({type: Types.ObjectId,ref:'user',required: true})
userId: string;
}

export const ParamSchema = SchemaFactory.createForClass(Param);