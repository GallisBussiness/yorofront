import { HttpException, Injectable } from '@nestjs/common';
import { CreateFactureVenteDto } from './dto/create-facture_vente.dto';
import { UpdateFactureVenteDto } from './dto/update-facture_vente.dto';
import { AbstractModel } from 'src/utils/abstractmodel';
import { FactureVente, FactureVenteDocument } from './entities/facture_vente.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FactureVenteService extends AbstractModel<FactureVente,CreateFactureVenteDto,UpdateFactureVenteDto>{
  constructor(@InjectModel(FactureVente.name) private readonly factureVenteModel: Model<FactureVenteDocument>){
    super(factureVenteModel);
  }

async findByVente(id:string):Promise<FactureVente[]>{
  try {
    return await this.factureVenteModel.find({vente:id});
  } catch (error) {
    throw new HttpException(error.message,500);
  }
}
}
