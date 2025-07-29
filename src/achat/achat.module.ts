import { Module } from '@nestjs/common';
import { AchatService } from './achat.service';
import { AchatController } from './achat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Achat, AchatSchema } from './entities/achat.entity';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Achat.name,
        useFactory: () => {
          const schema = AchatSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
  ],
  controllers: [AchatController],
  providers: [AchatService],
  exports:[AchatService]
})
export class AchatModule {}
