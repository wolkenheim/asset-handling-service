import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { AssetExtension } from '../entity/asset-extension.enum';
import { AssetType } from '../entity/asset-type.enum';

export class CreateAssetDTO {

    @IsInt()
    scene: number;

    @IsInt()
    variant: number;

    @IsInt()
    camera: number;

    @IsNotEmpty()
    @IsEnum(AssetType)
    type: AssetType

    @IsNotEmpty()
    @IsEnum(AssetExtension)
    extension: AssetExtension
}