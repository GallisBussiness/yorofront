import { IsIn, IsOptional, IsDateString } from 'class-validator';

export type Periode = 'jour' | 'semaine' | 'mois';

export class TotalQueryDto {
  @IsOptional()
  @IsIn(['jour', 'semaine', 'mois'])
  periode?: Periode;

  @IsOptional()
  @IsDateString()
  from?: string;

  @IsOptional()
  @IsDateString()
  to?: string;
}

export interface JourBucket {
  jour: string; // YYYY-MM-DD
  total: number;
  count: number;
}

export interface TotauxResultat {
  periode: Periode | 'custom';
  from: string;
  to: string;
  total: number;
  count: number;
  parJour: JourBucket[];
}
