import { IsArray, IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAchatDto {
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
    
    @IsOptional()
    @IsMongoId()
    depot?: string;

    @IsMongoId()
    fournisseur:string;

    @IsMongoId()
    userId:string;
}
