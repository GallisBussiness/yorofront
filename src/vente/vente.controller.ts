import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VenteService } from './vente.service';
import { CreateVenteDto } from './dto/create-vente.dto';
import { UpdateVenteDto } from './dto/update-vente.dto';
import { InvoiceNumber } from 'invoice-number';

@Controller('vente')
export class VenteController {
  constructor(private readonly venteService: VenteService) {}

  @Post()
  async create(@Body() createVenteDto: CreateVenteDto) {
    const ini = "100VVV000";
    const lastVente = await this.venteService.findLastByUserId(createVenteDto.userId);
    if(lastVente){
      createVenteDto.ref = InvoiceNumber.next(lastVente.ref);
    } else {
      createVenteDto.ref = ini;
    } 
    return this.venteService.create(createVenteDto);
  }

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string) {
    return this.venteService.findAllByUser(userId);
  }

  @Get('byclient/:client')
  findByClient(@Param('client') client: string) {
    return this.venteService.findByClient(client);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.venteService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVenteDto: UpdateVenteDto) {
    return this.venteService.update(id, updateVenteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.venteService.remove(id);
  }
}
