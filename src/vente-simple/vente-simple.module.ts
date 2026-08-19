import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VenteSimpleController } from './vente-simple.controller';
import { VenteSimpleService } from './vente-simple.service';
import {
  VenteSimple,
  VenteSimpleSchema,
} from './entities/vente-simple.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VenteSimple.name, schema: VenteSimpleSchema },
    ]),
  ],
  controllers: [VenteSimpleController],
  providers: [VenteSimpleService],
  exports: [VenteSimpleService],
})
export class VenteSimpleModule {}
