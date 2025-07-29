import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FactureAchatService } from './facture_achat.service';
import { CreateFactureAchatDto } from './dto/create-facture_achat.dto';
import { UpdateFactureAchatDto } from './dto/update-facture_achat.dto';

@Controller('facture-achat')
export class FactureAchatController {
  constructor(private readonly factureAchatService: FactureAchatService) {}

  @Post()
  create(@Body() createFactureAchatDto: CreateFactureAchatDto) {
    return this.factureAchatService.create(createFactureAchatDto);
  }

  @Get('user/:userId')
  findAll(@Param('userId') userId: string) {
    return this.factureAchatService.findByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.factureAchatService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFactureAchatDto: UpdateFactureAchatDto) {
    return this.factureAchatService.update(id, updateFactureAchatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.factureAchatService.remove(id);
  }
}
