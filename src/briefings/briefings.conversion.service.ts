import { Injectable } from "@nestjs/common";
import { BriefingDTOToBriefingConverter } from "./converters/briefing-dto-to-briefing";
import { AssetDTOToAssetConverter } from "./converters/asset-dto-to-asset";

@Injectable()
export class BriefingsConversionService {
    constructor(
        private readonly briefingDTOToBriefingConverter: BriefingDTOToBriefingConverter,
        private readonly assetDTOToAssetConverter: AssetDTOToAssetConverter
    ) { }

}