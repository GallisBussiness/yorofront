import { Injectable } from '@nestjs/common';
import { CreateDetteDto } from './dto/create-dette.dto';
import { UpdateDetteDto } from './dto/update-dette.dto';
import { AbstractModel } from 'src/utils/abstractmodel';
import { Dette, DetteDocument } from './entities/dette.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class DetteService extends AbstractModel<Dette,CreateDetteDto,UpdateDetteDto>{
  constructor(@InjectModel(Dette.name) private readonly detteModel: Model<DetteDocument>){
    super(detteModel);
  }

  async findBy(id:string){
    const dettes = await this.detteModel.aggregate([
      {
        $match: {
          client: new Types.ObjectId(id)
        }
      },
      {
      $addFields: {
          id: {$toString:"$_id"}
      }
      },
      {
       $lookup: {
         from: 'paiementclients',
         localField: 'id',
         foreignField: 'dette',
         as: 'paiements'
       }
      }
    ]);
    return dettes;
  }
}
