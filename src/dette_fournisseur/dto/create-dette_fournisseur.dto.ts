import { IsMongoId, IsNumber, IsString } from "class-validator";

export class CreateDetteFournisseurDto {
    @IsNumber()
    montant:number;

    @IsString()
    date:string;

    @IsMongoId()
    fournisseur:string;
}
