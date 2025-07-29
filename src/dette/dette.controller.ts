import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetteService } from './dette.service';
import { CreateDetteDto } from './dto/create-dette.dto';
import { UpdateDetteDto } from './dto/update-dette.dto';

@Controller('dette')
export class DetteController {
  constructor(private readonly detteService: DetteService) {}

  @Post()
  create(@Body() createDetteDto: CreateDetteDto) {
    return this.detteService.create(createDetteDto);
  }

  @Get()
  findAll() {
    return this.detteService.findAll();
  }

  
  @Get('by/:id')
  findByClient(@Param('id') id: string) {
    return this.detteService.findBy(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detteService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetteDto: UpdateDetteDto) {
    return this.detteService.update(id, updateDetteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detteService.remove(id);
  }
}
