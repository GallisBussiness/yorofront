import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type JournalDocument = HydratedDocument<Journal>;

@Schema({timestamps:true})
export class Journal {
_id:string;

@Prop({type:Date,required:true})
date:Date;

@Prop({type:Object,required:true})
user:object;

@Prop({type:String,required:true})
method:string;

@Prop({type:String,required:true})
url:string;

@Prop({type:Number,required:true})
status:number;
}

export const JournalSchema = SchemaFactory.createForClass(Journal);
