import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePackDto {
    @IsString()
    nom: string;

    @IsNumber()
    nb_jours: number;
    
    @IsNumber()
    prix: number;
    
    @IsNumber()
    duree_mois: number;
    
    @IsString()
    @IsOptional()
    description?: string;
    
    @IsBoolean()
    @IsOptional()
    actif?: boolean;
}
