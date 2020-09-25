import { IsNotEmpty } from 'class-validator';

export class CreateUploadDTO {

    @IsNotEmpty()
    fileName: string;

    @IsNotEmpty()
    hashedName: string;
}