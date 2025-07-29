import { Module } from '@nestjs/common';
import { DetteFournisseurService } from './dette_fournisseur.service';
import { DetteFournisseurController } from './dette_fournisseur.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DetteFournisseur, DetteFournisseurSchema } from './entities/dette_fournisseur.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: DetteFournisseur.name, schema: DetteFournisseurSchema }])],
  controllers: [DetteFournisseurController],
  providers: [DetteFournisseurService],
})
export class DetteFournisseurModule {}
