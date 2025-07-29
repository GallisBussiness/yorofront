import { Injectable } from '@nestjs/common';
import { CreateFamilleDto } from './dto/create-famille.dto';
import { UpdateFamilleDto } from './dto/update-famille.dto';
import { AbstractModel } from 'src/utils/abstractmodel';
import { Famille, FamilleDocument } from './entities/famille.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FamilleService extends AbstractModel<Famille,CreateFamilleDto,UpdateFamilleDto>{
  constructor(@InjectModel(Famille.name) private readonly familleModel: Model<FamilleDocument>){
    super(familleModel);
  }
}
