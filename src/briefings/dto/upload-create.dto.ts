import { IsNotEmpty } from 'class-validator';

export class UploadCreateDTO {

    @IsNotEmpty()
    file_name: string;

    @IsNotEmpty()
    hashed_name: string;
}