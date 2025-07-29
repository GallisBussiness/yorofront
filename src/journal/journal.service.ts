import { Injectable } from '@nestjs/common';
import { AbstractModel } from 'src/utils/abstractmodel';
import { Journal, JournalDocument } from './entities/journal.entity';
import { CreateJournalDto } from './dto/create-journal.dto';
import { UpdateJournalDto } from './dto/update-journal.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class JournalService extends AbstractModel<Journal,CreateJournalDto,UpdateJournalDto>{
 constructor(@InjectModel(Journal.name) private readonly journalModel: Model<JournalDocument>){
  super(journalModel);
 }
}
