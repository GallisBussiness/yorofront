import { Injectable } from '@nestjs/common';
import { CreateUniteDto } from './dto/create-unite.dto';
import { UpdateUniteDto } from './dto/update-unite.dto';
import { AbstractModel } from 'src/utils/abstractmodel';
import { Unite, UniteDocument } from './entities/unite.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UniteService extends AbstractModel<Unite,CreateUniteDto,UpdateUniteDto>{
  constructor(@InjectModel(Unite.name) private readonly uniteModel: Model<UniteDocument>){
    super(uniteModel);
  }
}
