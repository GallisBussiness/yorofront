import { IsDate, IsMongoId, IsNumber } from "class-validator";

export class CreateFactureAchatDto {
    @IsDate()
    date: string;

    @IsMongoId()
    client: string;

    @IsNumber()
    montant: number;

    @IsMongoId()
    user:string;
}
