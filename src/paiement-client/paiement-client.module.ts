import { Module } from '@nestjs/common';
import { PaiementClientService } from './paiement-client.service';
import { PaiementClientController } from './paiement-client.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PaiementClient, PaiementClientSchema } from './entities/paiement-client.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:PaiementClient.name,schema:PaiementClientSchema}])],
  controllers: [PaiementClientController],
  providers: [PaiementClientService],
  exports:[PaiementClientService]
})
export class PaiementClientModule {}
