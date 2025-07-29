import { IsMongoId, IsPhoneNumber, IsString } from "class-validator";

export class CreateFournisseurDto {
    @IsString()
    nom: string;

    @IsPhoneNumber("SN")
    tel: string;

    @IsString()
    addr: string;
    
    @IsMongoId()
    userId: string;
}
