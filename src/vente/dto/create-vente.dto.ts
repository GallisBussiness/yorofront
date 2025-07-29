import { IsArray, IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateVenteDto {

    @IsOptional()
    @IsString()
    ref:string;

    @IsString()
    date:string;

    @IsArray()
    produits: object[];

    @IsNumber()
    montant:number;

    @IsNumber()
    remise:number;

    @IsNumber()
    net_a_payer:number;

    @IsMongoId()
    client:string;
    
    @IsMongoId()
    userId:string;
}
