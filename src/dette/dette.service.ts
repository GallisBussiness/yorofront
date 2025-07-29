import { Injectable } from '@nestjs/common';
import { CreateDetteDto } from './dto/create-dette.dto';
import { UpdateDetteDto } from './dto/update-dette.dto';
import { AbstractModel } from 'src/utils/abstractmodel';
import { Dette, DetteDocument } from './entities/dette.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DetteService extends AbstractModel<Dette,CreateDetteDto,UpdateDetteDto>{
  constructor(@InjectModel(Dette.name) private readonly detteModel: Model<DetteDocument>){
    super(detteModel);
  }

  async findBy(id:string){
    return this.detteModel.find({client:id});
  }
}
