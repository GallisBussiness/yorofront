import { IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateVenteSimpleDto {
  @IsNumber()
  @Min(0.01)
  montant: number;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
}
