import { Injectable } from '@nestjs/common';
import { CreateDetteFournisseurDto } from './dto/create-dette_fournisseur.dto';
import { UpdateDetteFournisseurDto } from './dto/update-dette_fournisseur.dto';
import { AbstractModel } from 'src/utils/abstractmodel';
import {
  DetteFournisseur,
  DetteFournisseurDocument,
} from './entities/dette_fournisseur.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

export interface DetteFournisseurWithTotal {
  _id: string;
  date: Date;
  fournisseur: string;
  montant: number;
  totalPaiements: number;
  resteAPayer: number;
  createdAt?: Date;
  updatedAt?: Date;
}

@Injectable()
export class DetteFournisseurService extends AbstractModel<
  DetteFournisseur,
  CreateDetteFournisseurDto,
  UpdateDetteFournisseurDto
> {
  constructor(
    @InjectModel(DetteFournisseur.name)
    private readonly detteFournisseurModel: Model<DetteFournisseurDocument>,
  ) {
    super(detteFournisseurModel);
  }

  async findBy(id: string): Promise<DetteFournisseurWithTotal[]> {
    const result = await this.detteFournisseurModel.aggregate([
      {
        $match: {
          fournisseur: new Types.ObjectId(id),
        },
      },
      {
        $addFields: {
          id_string: { $toString: '$_id' },
        },
      },
      {
        $lookup: {
          from: 'paiementdettefournisseurs',
          localField: 'id_string',
          foreignField: 'dette',
          as: 'paiements',
        },
      },
      {
        $addFields: {
          totalPaiements: { $sum: '$paiements.montant' },
        },
      },
      {
        $addFields: {
          resteAPayer: { $subtract: ['$montant', '$totalPaiements'] },
        },
      },
      {
        $project: {
          id_string: 0,
          paiements: 0,
        },
      },
    ]);
    return result;
  }

  async findAllWithTotalPaiements(): Promise<DetteFournisseurWithTotal[]> {
    const result = await this.detteFournisseurModel.aggregate([
      {
        $sort: { createdAt: -1 },
      },
      {
        $addFields: {
          id_string: { $toString: '$_id' },
        },
      },
      {
        $lookup: {
          from: 'paiementdettefournisseurs',
          localField: 'id_string',
          foreignField: 'dette',
          as: 'paiements',
        },
      },
      {
        $addFields: {
          totalPaiements: { $sum: '$paiements.montant' },
        },
      },
      {
        $addFields: {
          resteAPayer: { $subtract: ['$montant', '$totalPaiements'] },
        },
      },
      {
        $project: {
          id_string: 0,
          paiements: 0,
        },
      },
    ]);
    return result;
  }
}
