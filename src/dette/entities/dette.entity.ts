import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument ,Schema as MSchema} from "mongoose";
import { Client } from "src/client/entities/client.entity";

export type DetteDocument = HydratedDocument<Dette>;

@Schema({timestamps:true})
export class Dette {
    _id: string;

    @Prop({type:Number,required: true})
    montant:number;

    @Prop({type:Date,required: true})
    date:Date;

    @Prop({type:MSchema.Types.ObjectId,ref:Client.name,required: true})
    client:Client;
}

export const DetteSchema = SchemaFactory.createForClass(Dette);
