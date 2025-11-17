import { IsDateString, IsNumber } from "class-validator";

export class CreateVentecaisseDto {
    @IsNumber()
    montant:number;

    @IsDateString()
    date:string;
}
