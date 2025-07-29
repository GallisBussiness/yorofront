import { Injectable } from '@nestjs/common';
import { CreatePaiementFournisseurDto } from './dto/create-paiement-fournisseur.dto';
import { UpdatePaiementFournisseurDto } from './dto/update-paiement-fournisseur.dto';
import { AbstractModel } from 'src/utils/abstractmodel';
import { PaiementFournisseur, PaiementFournisseurDocument } from './entities/paiement-fournisseur.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PaiementFournisseurService extends AbstractModel<PaiementFournisseur,CreatePaiementFournisseurDto,UpdatePaiementFournisseurDto>{
  constructor(@InjectModel(PaiementFournisseur.name) private readonly paiementFournisseurModel: Model<PaiementFournisseurDocument>){
    super(paiementFournisseurModel);
  }

  async findByFournisseur(id: string) : Promise<PaiementFournisseur[]> {
    return this.paiementFournisseurModel.find({fournisseur: id}).exec();
  }

  async findByAchat(id: string) : Promise<PaiementFournisseur[]> {
    return this.paiementFournisseurModel.find({achat: id});
  }
}
