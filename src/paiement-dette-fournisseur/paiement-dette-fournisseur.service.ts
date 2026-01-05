import { HttpException, Injectable } from '@nestjs/common';
import { CreatePaiementDetteFournisseurDto } from './dto/create-paiement-dette-fournisseur.dto';
import { UpdatePaiementDetteFournisseurDto } from './dto/update-paiement-dette-fournisseur.dto';
import { AbstractModel } from 'src/utils/abstractmodel';
import { PaiementDetteFournisseur, PaiementDetteFournisseurDocument } from './entities/paiement-dette-fournisseur.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PaiementDetteFournisseurService extends AbstractModel<PaiementDetteFournisseur, CreatePaiementDetteFournisseurDto, UpdatePaiementDetteFournisseurDto> {
  constructor(@InjectModel(PaiementDetteFournisseur.name) private readonly paiementDetteFournisseurModel: Model<PaiementDetteFournisseurDocument>) {
    super(paiementDetteFournisseurModel);
  }

  async findByDette(detteId: string): Promise<PaiementDetteFournisseur[]> {
    try {
      return await this.paiementDetteFournisseurModel.find({ dette: detteId });
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
