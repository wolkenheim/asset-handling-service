import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateAssetDTO {

    @IsInt()
    scene: number;

    @IsInt()
    variant: number;

    @IsInt()
    camera: number;
}