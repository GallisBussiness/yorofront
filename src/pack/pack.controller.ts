import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PackService } from './pack.service';
import { CreatePackDto } from './dto/create-pack.dto';


@Controller('pack')
export class PackController {
  constructor(private readonly packService: PackService) {}

  @Post()
  create(@Body() createPackDto: CreatePackDto) {
    return this.packService.create(createPackDto);
  }

  @Get()
  findAll() {
    return this.packService.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.packService.findByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.packService.findOne(id);
  }

}
