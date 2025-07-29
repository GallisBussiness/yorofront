import { Module } from '@nestjs/common';
import { DetteService } from './dette.service';
import { DetteController } from './dette.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Dette, DetteSchema } from './entities/dette.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Dette.name, schema: DetteSchema }])],
  controllers: [DetteController],
  providers: [DetteService],
  exports: [DetteService]
})
export class DetteModule {}
