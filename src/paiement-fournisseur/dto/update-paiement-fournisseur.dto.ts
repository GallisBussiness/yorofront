import { PartialType } from '@nestjs/swagger';
import { CreatePaiementFournisseurDto } from './create-paiement-fournisseur.dto';

export class UpdatePaiementFournisseurDto extends PartialType(CreatePaiementFournisseurDto) {}
