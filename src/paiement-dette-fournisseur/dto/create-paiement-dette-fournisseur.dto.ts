import { IsMongoId, IsNumber, IsString } from "class-validator";

export class CreatePaiementDetteFournisseurDto {
    @IsString()
    date: string;

    @IsMongoId()
    dette: string;
    
    @IsNumber()
    montant: number;
}
