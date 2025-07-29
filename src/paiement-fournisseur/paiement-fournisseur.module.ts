import { Module } from '@nestjs/common';
import { PaiementFournisseurService } from './paiement-fournisseur.service';
import { PaiementFournisseurController } from './paiement-fournisseur.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PaiementFournisseur, PaiementFournisseurSchema } from './entities/paiement-fournisseur.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:PaiementFournisseur.name,schema: PaiementFournisseurSchema} ])],
  controllers: [PaiementFournisseurController],
  providers: [PaiementFournisseurService],
  exports:[PaiementFournisseurService]
})
export class PaiementFournisseurModule {}
