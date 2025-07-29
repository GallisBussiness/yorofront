import { Module } from '@nestjs/common';
import { FactureVenteService } from './facture_vente.service';
import { FactureVenteController } from './facture_vente.controller';
import { FactureVente, FactureVenteSchema } from './entities/facture_vente.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeatureAsync([{name:FactureVente.name,useFactory:() => {
    const schema = FactureVenteSchema;
    schema.plugin(require('mongoose-autopopulate'));
    schema.plugin(require('mongoose-serial'),{ field:"ref",prefix:'FA',separator: ""})
    return schema;
  }}])],
  controllers: [FactureVenteController],
  providers: [FactureVenteService],
})
export class FactureVenteModule {}
