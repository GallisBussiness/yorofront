import { Injectable } from '@nestjs/common';
import { CreateAchatDto } from './dto/create-achat.dto';
import { UpdateAchatDto } from './dto/update-achat.dto';
import { AbstractModel } from 'src/utils/abstractmodel';
import { Achat, AchatDocument } from './entities/achat.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AchatService extends AbstractModel<Achat,CreateAchatDto,UpdateAchatDto>{
  constructor(@InjectModel(Achat.name) private readonly venteModel: Model<AchatDocument>){
    super(venteModel)
  }

  async findLastByUserId(userId: string): Promise<Achat | null> {
    return this.venteModel.findOne({ userId }).sort({ ref: -1 }).limit(1);
  }

  async findByFournisseur(id: string) : Promise<Achat[]> {
    return this.venteModel.find({fournisseur: id}).exec();
  }

  async findByDepot(id: string) : Promise<Achat[]> {
    return this.venteModel.find({depot: id}).exec();
  }
}
