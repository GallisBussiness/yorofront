import { IsDate, IsMongoId, IsString } from "class-validator";

export class CreateFactureVenteDto {
    @IsString()
    date: string;

    @IsMongoId()
    client:string;

    @IsMongoId()
    vente:string;

    @IsMongoId()
    user:string;
}
