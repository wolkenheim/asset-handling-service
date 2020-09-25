import { IsNotEmpty } from 'class-validator';
export class UploadDTO {

    @IsNotEmpty()
    file_name: string;

    @IsNotEmpty()
    hashed_name: string;
}