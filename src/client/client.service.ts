import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { AbstractModel } from 'src/utils/abstractmodel';
import { Client, ClientDocument } from './entities/client.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ClientService extends AbstractModel<Client,CreateClientDto,UpdateClientDto>{
  constructor(@InjectModel(Client.name) private readonly clientModel: Model<ClientDocument>){
    super(clientModel);
  }
}
