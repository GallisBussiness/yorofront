import { PartialType } from '@nestjs/swagger';
import { CreateDetteFournisseurDto } from './create-dette_fournisseur.dto';

export class UpdateDetteFournisseurDto extends PartialType(CreateDetteFournisseurDto) {}
