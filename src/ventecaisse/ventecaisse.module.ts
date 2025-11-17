import { Module } from '@nestjs/common';
import { VentecaisseService } from './ventecaisse.service';
import { VentecaisseController } from './ventecaisse.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ventecaisse, VentecaisseSchema } from './entities/ventecaisse.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:Ventecaisse.name,schema:VentecaisseSchema}])],
  controllers: [VentecaisseController],
  providers: [VentecaisseService],
})
export class VentecaisseModule {}
