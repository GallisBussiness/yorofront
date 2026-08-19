import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { Session } from '@thallesp/nestjs-better-auth';
import { VenteSimpleService } from './vente-simple.service';
import { CreateVenteSimpleDto } from './dto/create-vente-simple.dto';
import { UpdateVenteSimpleDto } from './dto/update-vente-simple.dto';
import { Periode, TotalQueryDto } from './dto/totaux.dto';

@ApiTags('vente-simple')
@ApiBearerAuth()
@Controller('vente-simple')
export class VenteSimpleController {
  constructor(private readonly service: VenteSimpleService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une vente rapide (montant + date du jour)' })
  create(@Session() session: any, @Body() dto: CreateVenteSimpleDto) {
    return this.service.create(session.user.id, dto);
  }

  @Get('total/jour')
  @ApiOperation({ summary: 'Total des ventes du jour (avec détail par jour)' })
  totalJour(@Session() session: any) {
    return this.service.getTotal(session.user.id, 'jour');
  }

  @Get('total/semaine')
  @ApiOperation({
    summary: 'Total des ventes de la semaine (lun→dim, détail par jour)',
  })
  totalSemaine(@Session() session: any) {
    return this.service.getTotal(session.user.id, 'semaine');
  }

  @Get('total/mois')
  @ApiOperation({
    summary: 'Total des ventes du mois calendaire (détail par jour)',
  })
  totalMois(@Session() session: any) {
    return this.service.getTotal(session.user.id, 'mois');
  }

  @Get('total')
  @ApiOperation({
    summary: 'Total sur une période personnalisée (from/to ISO) ou par défaut le mois courant',
  })
  @ApiQuery({ name: 'from', required: false, type: String })
  @ApiQuery({ name: 'to', required: false, type: String })
  @ApiQuery({ name: 'periode', required: false, enum: ['jour', 'semaine', 'mois'] })
  async totalCustom(
    @Session() session: any,
    @Query() query: TotalQueryDto,
  ) {
    if (query.from && query.to) {
      return this.service.getTotalByRange(
        session.user.id,
        new Date(query.from),
        new Date(query.to),
      );
    }
    const periode: Periode = query.periode ?? 'mois';
    return this.service.getTotal(session.user.id, periode);
  }

  @Get()
  @ApiOperation({ summary: 'Liste des ventes (filtrable par from/to)' })
  @ApiQuery({ name: 'from', required: false, type: String })
  @ApiQuery({ name: 'to', required: false, type: String })
  findAll(
    @Session() session: any,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.service.findAllByUser(
      session.user.id,
      from ? new Date(from) : undefined,
      to ? new Date(to) : undefined,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détail d\'une vente rapide' })
  async findOne(@Session() session: any, @Param('id') id: string) {
    const doc = await this.service.findOneForUser(id, session.user.id);
    if (!doc) throw new NotFoundException();
    return doc;
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Modifier une vente (uniquement si elle date du jour courant)',
  })
  update(
    @Session() session: any,
    @Param('id') id: string,
    @Body() dto: UpdateVenteSimpleDto,
  ) {
    return this.service.update(id, session.user.id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Supprimer une vente (uniquement si elle date du jour courant)',
  })
  remove(@Session() session: any, @Param('id') id: string) {
    return this.service.remove(id, session.user.id);
  }
}
