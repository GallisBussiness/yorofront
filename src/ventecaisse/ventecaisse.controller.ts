import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VentecaisseService } from './ventecaisse.service';
import { CreateVentecaisseDto } from './dto/create-ventecaisse.dto';
import { UpdateVentecaisseDto } from './dto/update-ventecaisse.dto';

@Controller('vente-caisse')
export class VentecaisseController {
  constructor(private readonly ventecaisseService: VentecaisseService) {}

  @Post()
  create(@Body() createVentecaisseDto: CreateVentecaisseDto) {
    return this.ventecaisseService.create(createVentecaisseDto);
  }

  @Get()
  findAll() {
    return this.ventecaisseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ventecaisseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVentecaisseDto: UpdateVentecaisseDto) {
    return this.ventecaisseService.update(id, updateVentecaisseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ventecaisseService.remove(id);
  }
}
