import { Module } from '@nestjs/common';
import { FactureAchatService } from './facture_achat.service';
import { FactureAchatController } from './facture_achat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FactureAchat, FactureAchatSchema } from './entities/facture_achat.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:FactureAchat.name,schema: FactureAchatSchema}])],
  controllers: [FactureAchatController],
  providers: [FactureAchatService],
})
export class FactureAchatModule {}
