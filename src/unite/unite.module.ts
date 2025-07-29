import { Module } from '@nestjs/common';
import { UniteService } from './unite.service';
import { UniteController } from './unite.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Unite, UniteSchema } from './entities/unite.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:Unite.name,schema: UniteSchema}])],
  controllers: [UniteController],
  providers: [UniteService],
})
export class UniteModule {}
