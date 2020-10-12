import { AssetType } from "../entity/asset-type.enum";
import { AssetExtension } from "../entity/asset-extension.enum";
import { AssetCreateDTO } from "../dto/asset-create.dto";
import { Asset } from "../entity/asset.entity";
import { Converter } from "./converter.interface";
import { Briefing } from "../entity/briefing.entity";
import { AssetNameHelper } from "../entity/asset-name.helper";

export class AssetDTOToAssetConverter implements Converter<AssetCreateDTO, Asset> {

    public convert(assetCreateDTO: AssetCreateDTO): Asset {

        const asset = new Asset();

        asset.type = assetCreateDTO.type ? assetCreateDTO.type : AssetType.CONTENT_IMAGE;
        asset.extension = assetCreateDTO.extension ? assetCreateDTO.extension : AssetExtension.JPG;
        asset.variant = assetCreateDTO.variant;
        asset.camera = assetCreateDTO.camera;

        return asset;
    }

    public convertWithAdditionalAttributes(briefing: Briefing, createAssetDTO: AssetCreateDTO): Asset {

        const asset: Asset = this.convert(createAssetDTO);

        asset.briefing = briefing;

        asset.scene = briefing.scene;
        asset.sort_order = this.getNextSortOrderIndex(briefing.assets);
        asset.file_name = new AssetNameHelper(briefing, asset).buildName();


        return asset;
    }


    public getNextSortOrderIndex(assets: Asset[]): number {
        if (!assets.length) return 1;
        const arrayOfNumber = assets.map((asset: Asset) => asset.sort_order);
        const max = Math.max(...arrayOfNumber);
        return max + 1;
    }
}