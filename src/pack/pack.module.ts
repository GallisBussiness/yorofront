import { Module } from '@nestjs/common';
import { PackService } from './pack.service';
import { PackController } from './pack.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pack, PackSchema } from './entities/pack.entity';
import { SubscriptionPacksSeedService } from './seed/subscription-packs.seed';

@Module({
  imports:[MongooseModule.forFeature([{name:Pack.name,schema: PackSchema}])],
  controllers: [PackController],
  providers: [PackService, SubscriptionPacksSeedService],
  exports: [PackService, SubscriptionPacksSeedService]
})
export class PackModule {}
