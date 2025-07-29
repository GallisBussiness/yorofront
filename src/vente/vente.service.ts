import { HttpException, Injectable } from '@nestjs/common';
import { CreateVenteDto } from './dto/create-vente.dto';
import { UpdateVenteDto } from './dto/update-vente.dto';
import { AbstractModel } from 'src/utils/abstractmodel';
import { Vente, VenteDocument } from './entities/vente.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class VenteService extends AbstractModel<Vente,CreateVenteDto,UpdateVenteDto>{
  constructor(@InjectModel(Vente.name) private readonly venteModel: Model<VenteDocument>){
    super(venteModel)
  }
  async findByClient(client: string): Promise<Vente[]> {
    try {
      return await this.venteModel.find({client})
    } catch (error) {
      throw new HttpException(error.message,500);
    }
  }

  async findLastByUserId(userId: string): Promise<Vente> {
    try {
      return await this.venteModel.findOne({ userId }).sort({ createdAt: -1 }).limit(1);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findAllByUser(userId: string): Promise<Vente[]> {
    try {
      return await this.venteModel.find({ userId }).sort({ date: 1 });
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
