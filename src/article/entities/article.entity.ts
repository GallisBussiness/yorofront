import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Famille } from "src/famille/entities/famille.entity";
import { Unite } from "src/unite/entities/unite.entity";

export type ArticleDocument = HydratedDocument<Article>;

@Schema({timestamps: true})
export class Article {

    _id:string;

    @Prop({type: String,required: true})
    ref: string;

    @Prop({type: String,required: true})
    nom: string;

    @Prop({type: Number,required: true,default:0})
    stock_seuil: number;

    @Prop({type: Number,required: true,default:0})
    prix: number;

    @Prop({type: Types.ObjectId,ref: Famille.name,required: true,autopopulate:true})
    famille: string;

    @Prop({type:Types.ObjectId,ref:Unite.name,required: true,autopopulate:true})
    unite: string;

    @Prop({type: Types.ObjectId,ref: 'user',required: true})
    userId: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article).index({ref:1,userId:1,nom:1},{unique:true});
