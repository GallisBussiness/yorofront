import { Injectable } from '@nestjs/common';
import { CreateDetteFournisseurDto } from './dto/create-dette_fournisseur.dto';
import { UpdateDetteFournisseurDto } from './dto/update-dette_fournisseur.dto';
import { AbstractModel } from 'src/utils/abstractmodel';
import { DetteFournisseur, DetteFournisseurDocument } from './entities/dette_fournisseur.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DetteFournisseurService extends AbstractModel<DetteFournisseur,CreateDetteFournisseurDto,UpdateDetteFournisseurDto>{
  constructor(@InjectModel(DetteFournisseur.name) private readonly detteFournisseurModel: Model<DetteFournisseurDocument>){
    super(detteFournisseurModel);
  }

  async findBy(id:string){
    return this.detteFournisseurModel.find({fournisseur:id});
  }
}
