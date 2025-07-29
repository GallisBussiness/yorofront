import { Module } from '@nestjs/common';
import { FournisseurService } from './fournisseur.service';
import { FournisseurController } from './fournisseur.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Fournisseur, FournisseurSchema } from './entities/fournisseur.entity';

@Module({
  imports:[MongooseModule.forFeature([{name: Fournisseur.name, schema: FournisseurSchema}])],
  controllers: [FournisseurController],
  providers: [FournisseurService],
})
export class FournisseurModule {}
