import { Injectable } from '@nestjs/common';
import { CreatePackDto } from './dto/create-pack.dto';
import { UpdatePackDto } from './dto/update-pack.dto';
import { AbstractModel } from 'src/utils/abstractmodel';
import { Pack, PackDocument } from './entities/pack.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PackService extends AbstractModel<Pack,CreatePackDto,UpdatePackDto>{
  constructor(@InjectModel(Pack.name) private readonly packModel: Model<PackDocument>){
    super(packModel);
  }
}
