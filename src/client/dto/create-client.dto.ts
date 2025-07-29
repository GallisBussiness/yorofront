import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsPhoneNumber, IsString } from "class-validator";

export class CreateClientDto {
    @ApiProperty({ example: 'Modou', description: 'Le nom du client' })
    @IsString()
    nom: string;

    @ApiProperty({ example: '77 845 75 85', description: 'Telephone du client' })
    @IsPhoneNumber("SN")
    tel: string;

    @IsString()
    addr: string;

    @IsMongoId()
    userId: string;
}
