import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDepotDto } from './dto/create-depot.dto';
import { UpdateDepotDto } from './dto/update-depot.dto';
import { Depot, DepotDocument } from './entities/depot.entity';

@Injectable()
export class DepotService {
  constructor(
    @InjectModel(Depot.name) private depotModel: Model<DepotDocument>,
  ) {}

  async create(createDepotDto: CreateDepotDto): Promise<Depot> {
    const createdDepot = new this.depotModel(createDepotDto);
    return createdDepot.save();
  }

  async findAll(): Promise<Depot[]> {
    return this.depotModel.find().exec();
  }

  async findOne(id: string): Promise<Depot> {
    return this.depotModel.findById(id).exec();
  }

  async update(id: string, updateDepotDto: UpdateDepotDto): Promise<Depot> {
    return this.depotModel.findByIdAndUpdate(id, updateDepotDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Depot> {
    return this.depotModel.findByIdAndDelete(id).exec();
  }

  async findActive(userId: string): Promise<Depot[]> {
    return this.depotModel.find({ actif: true, userId });
  }

  async findByUser(userId: string): Promise<Depot[]> {
    return this.depotModel.find({ userId });
  }
}
