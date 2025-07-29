import { IsMongoId, IsNumber, IsString } from "class-validator";

export class CreatePaiementClientDto {
    @IsString()
    date:string;

    @IsMongoId()
    dette:string;
    
    @IsNumber()
    montant:number;
}
