import { Module } from '@nestjs/common';
import { ParamService } from './param.service';
import { ParamController } from './param.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Param, ParamSchema } from './entities/param.entity';
import { diskStorage } from 'multer';
import { MulterModule } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = uuidv4();
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + '-' + file.originalname,
    );
  },
});

@Module({
  imports: [MongooseModule.forFeatureAsync([{name: Param.name,useFactory:() => {
    const schema =  ParamSchema;
    schema.plugin(require('mongoose-autopopulate'));
    return schema;
  }}]),
  MulterModule.register({
    storage
  })
],
  controllers: [ParamController],
  providers: [ParamService],
})
export class ParamModule {}
