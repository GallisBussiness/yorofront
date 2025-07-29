import { IsDate, IsNumber, IsMongoId, IsString } from "class-validator";
export class CreateDetteDto {
    @IsNumber()
    montant:number;

    @IsString()
    date:string;

    @IsMongoId()
    client:string;
}
