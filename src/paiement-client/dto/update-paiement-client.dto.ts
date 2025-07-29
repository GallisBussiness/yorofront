import { PartialType } from '@nestjs/swagger';
import { CreatePaiementClientDto } from './create-paiement-client.dto';

export class UpdatePaiementClientDto extends PartialType(CreatePaiementClientDto) {}
