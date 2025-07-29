import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetteFournisseurService } from './dette_fournisseur.service';
import { CreateDetteFournisseurDto } from './dto/create-dette_fournisseur.dto';
import { UpdateDetteFournisseurDto } from './dto/update-dette_fournisseur.dto';

@Controller('dette-fournisseur')
export class DetteFournisseurController {
  constructor(private readonly detteFournisseurService: DetteFournisseurService) {}

  @Post()
  create(@Body() createDetteFournisseurDto: CreateDetteFournisseurDto) {
    return this.detteFournisseurService.create(createDetteFournisseurDto);
  }

  @Get()
  findAll() {
    return this.detteFournisseurService.findAll();
  }

  @Get('by/:id')
  findByFournisseur(@Param('id') id: string) {
    return this.detteFournisseurService.findBy(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detteFournisseurService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetteFournisseurDto: UpdateDetteFournisseurDto) {
    return this.detteFournisseurService.update(id, updateDetteFournisseurDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detteFournisseurService.remove(id);
  }
}
