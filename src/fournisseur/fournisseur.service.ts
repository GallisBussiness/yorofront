import { Injectable } from '@nestjs/common';
import { CreateFournisseurDto } from './dto/create-fournisseur.dto';
import { UpdateFournisseurDto } from './dto/update-fournisseur.dto';
import { AbstractModel } from 'src/utils/abstractmodel';
import { Fournisseur, FournisseurDocument } from './entities/fournisseur.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FournisseurService extends AbstractModel<Fournisseur,CreateFournisseurDto,UpdateFournisseurDto>{
 constructor(@InjectModel(Fournisseur.name) private readonly fournisseurModel: Model<FournisseurDocument>){
  super(fournisseurModel);
 }
}
