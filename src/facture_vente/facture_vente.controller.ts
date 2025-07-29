import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FactureVenteService } from './facture_vente.service';
import { CreateFactureVenteDto } from './dto/create-facture_vente.dto';
import { UpdateFactureVenteDto } from './dto/update-facture_vente.dto';

@Controller('facture-vente')
export class FactureVenteController {
  constructor(private readonly factureVenteService: FactureVenteService) {}

  @Post()
  create(@Body() createFactureVenteDto: CreateFactureVenteDto) {
    return this.factureVenteService.create(createFactureVenteDto);
  }

  @Get('user/:userId')
  findAll(@Param('userId') userId: string) {
    return this.factureVenteService.findByUserId(userId);
  }

  @Get('getbyvente/:id')
  findByVente(@Param('id') id: string) {
    return this.factureVenteService.findByVente(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.factureVenteService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFactureVenteDto: UpdateFactureVenteDto) {
    return this.factureVenteService.update(id, updateFactureVenteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.factureVenteService.remove(id);
  }
}
