import { HttpException } from "@nestjs/common";

export class AbstractModel<T,C,U> {
    constructor(
        protected model: any,
      ) {}


    async create(createDto: C): Promise<T> {
        try {
          const createdD = new this.model(createDto);
          return await createdD.save();
        } catch (error) {
          throw new HttpException(error.message, 500);
        }
      }
    
      async findAll(): Promise<T[]> {
        try {
          return await this.model.find({},{password:0}).sort({ createdAt: -1 });
        } catch (error) {
          throw new HttpException(error.message, 500);
        }
      }
    
        async findOne(id: string): Promise<T> {
          try {
            return  await this.model.findById(id,{password:0});
          } catch (error) {
            throw new HttpException(error.message, 500);
          }
        }
      
      async findByUserId(userId: string): Promise<T[]> {
        try {
          return await this.model.find({ userId }).sort({ createdAt: -1 });
        } catch (error) {
          throw new HttpException(error.message, 500);
        }
      }
    
      async update(
        id: string,
        updateDto: U,
      ): Promise<T> {
        try {
          return await this.model.findByIdAndUpdate(id, updateDto);
        } catch (error) {
          throw new HttpException(error.message, 500);
        }
      }
    
      async remove(id: string): Promise<T> {
        try {
          return await this.model.findByIdAndDelete(id);
        } catch (error) {
          throw new HttpException(error.message, 500);
        }
      }
}