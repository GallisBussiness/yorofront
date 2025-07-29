import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type DepotDocument = HydratedDocument<Depot>;

@Schema({ timestamps: true })
export class Depot {
    _id: string;

    @Prop({ type: String, required: true })
    nom: string;

    @Prop({ type: String, required: true })
    adresse: string;

    @Prop({ type: String, required: false })
    responsable: string;

    @Prop({ type: String, required: false })
    description: string;

    @Prop({ type: Boolean, default: true })
    actif: boolean;

    @Prop({ type: Types.ObjectId, ref: 'user', required: true })
    userId: string;
}

export const DepotSchema = SchemaFactory.createForClass(Depot);
