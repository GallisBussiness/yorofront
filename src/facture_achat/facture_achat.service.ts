import { Injectable } from '@nestjs/common';
import { CreateFactureAchatDto } from './dto/create-facture_achat.dto';
import { UpdateFactureAchatDto } from './dto/update-facture_achat.dto';
import { AbstractModel } from 'src/utils/abstractmodel';
import { FactureAchat, FactureAchatDocument } from './entities/facture_achat.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FactureAchatService extends AbstractModel<FactureAchat,CreateFactureAchatDto,UpdateFactureAchatDto>{
  constructor(@InjectModel(FactureAchat.name) private readonly factureAchatModel: Model<FactureAchatDocument>){
    super(factureAchatModel);
  }
}
