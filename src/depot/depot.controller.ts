import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DepotService } from './depot.service';
import { CreateDepotDto } from './dto/create-depot.dto';
import { UpdateDepotDto } from './dto/update-depot.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('depot')
@Controller('depot')
export class DepotController {
  constructor(private readonly depotService: DepotService) {}

  @Post()
  create(@Body() createDepotDto: CreateDepotDto) {
    return this.depotService.create(createDepotDto);
  }

  @Get()
  findAll() {
    return this.depotService.findAll();
  }

  @Get('user/:userId/active')
  findActive(@Param('userId') userId: string) {
    return this.depotService.findActive(userId);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.depotService.findByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.depotService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDepotDto: UpdateDepotDto) {
    return this.depotService.update(id, updateDepotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.depotService.remove(id);
  }
}
