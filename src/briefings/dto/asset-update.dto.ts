import { IsEnum, IsNotEmpty } from "class-validator";
import { AssetExtension } from "../entity/asset-extension.enum";

export class AssetUpdateDTO {

    @IsNotEmpty()
    @IsEnum(AssetExtension)
    extension: AssetExtension;
}