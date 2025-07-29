import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaiementFournisseurService } from './paiement-fournisseur.service';
import { CreatePaiementFournisseurDto } from './dto/create-paiement-fournisseur.dto';
import { UpdatePaiementFournisseurDto } from './dto/update-paiement-fournisseur.dto';

@Controller('paiement-fournisseur')
export class PaiementFournisseurController {
  constructor(private readonly paiementFournisseurService: PaiementFournisseurService) {}

  @Post()
  create(@Body() createPaiementFournisseurDto: CreatePaiementFournisseurDto) {
    return this.paiementFournisseurService.create(createPaiementFournisseurDto);
  }

  @Get('user/:userId')
  findAll(@Param('userId') userId: string) {
    return this.paiementFournisseurService.findByUserId(userId);
  }

  @Get('byfournisseur/:id')
  findByFournisseur(@Param('id') id: string) {
    return this.paiementFournisseurService.findByFournisseur(id);
  }

  @Get('byachat/:id')
  findByAchat(@Param('id') id: string) {
    return this.paiementFournisseurService.findByAchat(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paiementFournisseurService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaiementFournisseurDto: UpdatePaiementFournisseurDto) {
    return this.paiementFournisseurService.update(id, updatePaiementFournisseurDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paiementFournisseurService.remove(id);
  }
}
