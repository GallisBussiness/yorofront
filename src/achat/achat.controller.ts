import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AchatService } from './achat.service';
import { CreateAchatDto } from './dto/create-achat.dto';
import { UpdateAchatDto } from './dto/update-achat.dto';
import { InvoiceNumber } from 'invoice-number';

@Controller('achat')
export class AchatController {
  constructor(private readonly achatService: AchatService) {}

  @Post()
  async create(@Body() createAchatDto: CreateAchatDto) {
    const ini = "100AAA000";
    const lastAchat = await this.achatService.findLastByUserId(createAchatDto.userId);
    if(lastAchat){
      createAchatDto.ref = InvoiceNumber.next(lastAchat.ref);
    } else {
      createAchatDto.ref = ini;
    } 
    return this.achatService.create(createAchatDto);
  }

  @Get('user/:userId')
  findAll(@Param('userId') userId: string) {
    return this.achatService.findByUserId(userId);
  }

  @Get('byfournisseur/:fournisseur')
  findByFournisseur(@Param('fournisseur') fournisseur: string) {
    return this.achatService.findByFournisseur(fournisseur);
  }

  @Get('bydepot/:depot')
  findByDepot(@Param('depot') depot: string) {
    return this.achatService.findByDepot(depot);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.achatService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAchatDto: UpdateAchatDto) {
    return this.achatService.update(id, updateAchatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.achatService.remove(id);
  }
}
