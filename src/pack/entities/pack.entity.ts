import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
        
export type PackDocument = HydratedDocument<Pack>;

@Schema({timestamps: true})
export class Pack {
    @Prop({type: String,required: true})
    nom: string;

    @Prop({type: Number,required: true,default:0})
    nb_jours: number;
    
    @Prop({type: Number,required: true,default:0})
    prix: number;
    
    @Prop({type: Number,required: true,default:1})
    duree_mois: number;
    
    @Prop({type: String,required: false})
    description: string;
    
    @Prop({type: Boolean,default: true})
    actif: boolean;
}

export const PackSchema = SchemaFactory.createForClass(Pack);
