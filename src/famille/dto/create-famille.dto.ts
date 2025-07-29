import { IsMongoId, IsString } from "class-validator";

export class CreateFamilleDto {
    @IsString()
    nom: string;

    @IsMongoId()
    userId: string;
}
