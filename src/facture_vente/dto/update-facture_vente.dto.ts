import { PartialType } from '@nestjs/mapped-types';
import { CreateFactureVenteDto } from './create-facture_vente.dto';

export class UpdateFactureVenteDto extends PartialType(CreateFactureVenteDto) {}
