import { Module } from '@nestjs/common';
import { FamilleService } from './famille.service';
import { FamilleController } from './famille.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Famille, FamilleSchema } from './entities/famille.entity';

@Module({
  imports:[MongooseModule.forFeature([{name: Famille.name,schema: FamilleSchema}])],
  controllers: [FamilleController],
  providers: [FamilleService],
})
export class FamilleModule {}
