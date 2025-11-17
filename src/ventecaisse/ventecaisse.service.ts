import { Injectable } from '@nestjs/common';
import { CreateVentecaisseDto } from './dto/create-ventecaisse.dto';
import { UpdateVentecaisseDto } from './dto/update-ventecaisse.dto';
import { AbstractModel } from 'src/utils/abstractmodel';
import { Ventecaisse, VentecaisseDocument } from './entities/ventecaisse.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class VentecaisseService extends AbstractModel<Ventecaisse,CreateVentecaisseDto,UpdateVentecaisseDto>{
  constructor(@InjectModel(Ventecaisse.name) private readonly ventecaisseModel: Model<VentecaisseDocument>){
    super(ventecaisseModel);
  }
}
