import { IsMongoId, IsNumber, IsString } from "class-validator";

export class CreatePaiementFournisseurDto {
    @IsString()
    date:string;

    @IsMongoId()
    achat:string;

    @IsMongoId()
    fournisseur:string;

    @IsNumber()
    montant:number;
}
