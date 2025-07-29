import { HttpException, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { AbstractModel } from 'src/utils/abstractmodel';
import { Article, ArticleDocument } from './entities/article.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ArticleService extends AbstractModel<Article,CreateArticleDto,UpdateArticleDto>{
  constructor(@InjectModel(Article.name) private readonly articleModel: Model<ArticleDocument>){
    super(articleModel);
  }

  async findOneByRef(ref: string): Promise<Article> {
    try {
      return  await this.model.findOne({ref});
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
