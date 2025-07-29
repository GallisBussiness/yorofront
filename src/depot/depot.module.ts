import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DepotService } from './depot.service';
import { DepotController } from './depot.controller';
import { Depot, DepotSchema } from './entities/depot.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Depot.name, schema: DepotSchema }])
  ],
  controllers: [DepotController],
  providers: [DepotService],
  exports: [DepotService]
})
export class DepotModule {}
