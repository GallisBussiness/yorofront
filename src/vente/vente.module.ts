import { Module } from '@nestjs/common';
import { VenteService } from './vente.service';
import { VenteController } from './vente.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Vente, VenteSchema } from './entities/vente.entity';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Vente.name,
        useFactory: () => {
          const schema = VenteSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
  ],
  controllers: [VenteController],
  providers: [VenteService],
  exports:[VenteService]
})
export class VenteModule {}
