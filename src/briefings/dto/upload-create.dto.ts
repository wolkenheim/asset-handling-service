import { IsNotEmpty } from 'class-validator';

export class UploadCreateDTO {

    @IsNotEmpty()
    fileName: string;

    @IsNotEmpty()
    hashedName: string;
}