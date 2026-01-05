import { PartialType } from '@nestjs/swagger';
import { CreatePaiementDetteFournisseurDto } from './create-paiement-dette-fournisseur.dto';

export class UpdatePaiementDetteFournisseurDto extends PartialType(CreatePaiementDetteFournisseurDto) {}
