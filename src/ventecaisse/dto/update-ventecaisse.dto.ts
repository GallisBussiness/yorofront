import { PartialType } from '@nestjs/swagger';
import { CreateVentecaisseDto } from './create-ventecaisse.dto';

export class UpdateVentecaisseDto extends PartialType(CreateVentecaisseDto) {}
