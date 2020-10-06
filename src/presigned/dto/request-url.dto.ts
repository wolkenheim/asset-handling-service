import { IsNotEmpty } from 'class-validator';

export class RequestUrlDTO {

    @IsNotEmpty()
    filePath: string;

}