import { Module } from '@nestjs/common';
import { JournalService } from './journal.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Journal, JournalSchema } from './entities/journal.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:Journal.name,schema:JournalSchema}])],
  providers: [JournalService],
  exports: [JournalService]
})
export class JournalModule {}
