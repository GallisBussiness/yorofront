import { IsMongoId, IsNumber, IsString } from "class-validator";

export class CreateArticleDto {
    @IsString()
    ref: string;

    @IsString()
    nom: string;

    @IsNumber()
    stock_seuil: number;

    @IsMongoId()
    famille: string;

    @IsNumber()
    prix:number;

    @IsMongoId()
    unite: string;
    
    @IsMongoId()
    userId: string;
}
