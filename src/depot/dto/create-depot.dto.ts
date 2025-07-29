import { IsBoolean, IsMongoId, IsOptional, IsString } from "class-validator";

export class CreateDepotDto {
    @IsString()
    nom: string;

    @IsString()
    adresse: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    responsable?: string;

    @IsBoolean()
    @IsOptional()
    actif?: boolean;

    @IsMongoId()
    userId: string;
}
