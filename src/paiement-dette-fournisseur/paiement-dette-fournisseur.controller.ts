import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaiementDetteFournisseurService } from './paiement-dette-fournisseur.service';
import { CreatePaiementDetteFournisseurDto } from './dto/create-paiement-dette-fournisseur.dto';
import { UpdatePaiementDetteFournisseurDto } from './dto/update-paiement-dette-fournisseur.dto';

@Controller('paiement-dette-fournisseur')
export class PaiementDetteFournisseurController {
  constructor(private readonly paiementDetteFournisseurService: PaiementDetteFournisseurService) {}

  @Post()
  create(@Body() createPaiementDetteFournisseurDto: CreatePaiementDetteFournisseurDto) {
    return this.paiementDetteFournisseurService.create(createPaiementDetteFournisseurDto);
  }

  @Get('user/:userId')
  findAll(@Param('userId') userId: string) {
    return this.paiementDetteFournisseurService.findByUserId(userId);
  }

  @Get('bydette/:id')
  findByDette(@Param('id') id: string) {
    return this.paiementDetteFournisseurService.findByDette(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paiementDetteFournisseurService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaiementDetteFournisseurDto: UpdatePaiementDetteFournisseurDto) {
    return this.paiementDetteFournisseurService.update(id, updatePaiementDetteFournisseurDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paiementDetteFournisseurService.remove(id);
  }
}
