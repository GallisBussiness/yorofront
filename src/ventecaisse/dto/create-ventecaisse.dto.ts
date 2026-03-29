import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ProduitVenteCaisseDto {
  @IsString()
  nom: string;

  @IsNumber()
  quantite: number;

  @IsNumber()
  prixUnitaire: number;

  @IsNumber()
  montant: number;
}

export class CreateVentecaisseDto {
  @IsOptional()
  @IsDateString()
  date?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProduitVenteCaisseDto)
  produits: ProduitVenteCaisseDto[];

  @IsNumber()
  montantTotal: number;
}
