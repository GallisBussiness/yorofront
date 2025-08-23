import { IsDate, IsEnum, IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreatePaymentDto {
    @IsMongoId()
    pack: string;
    
    @IsOptional()
    @IsMongoId()
    user?: string;
    
    @IsOptional()
    @IsNumber()
    montant: number;
    
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    date_debut: Date;
    
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    date_fin: Date;
    
    @IsOptional()
    @IsEnum(['mensuel','trimestriel','semestriel'])
    type_abonnement: string;
    
    @IsOptional()
    @IsEnum(['en_attente', 'valide', 'annule', 'expire'])
    statut?: string;
    
    @IsOptional()
    @IsString()
    methode_paiement?: string;
    
    @IsOptional()
    @IsString()
    transaction_id?: string;
}
