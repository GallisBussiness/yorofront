import { PartialType } from '@nestjs/swagger';
import { CreateVenteSimpleDto } from './create-vente-simple.dto';

export class UpdateVenteSimpleDto extends PartialType(CreateVenteSimpleDto) {}
