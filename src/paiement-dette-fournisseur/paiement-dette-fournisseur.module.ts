import { Module } from '@nestjs/common';
import { PaiementDetteFournisseurService } from './paiement-dette-fournisseur.service';
import { PaiementDetteFournisseurController } from './paiement-dette-fournisseur.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PaiementDetteFournisseur, PaiementDetteFournisseurSchema } from './entities/paiement-dette-fournisseur.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: PaiementDetteFournisseur.name, schema: PaiementDetteFournisseurSchema }])],
  controllers: [PaiementDetteFournisseurController],
  providers: [PaiementDetteFournisseurService],
  exports: [PaiementDetteFournisseurService]
})
export class PaiementDetteFournisseurModule {}
