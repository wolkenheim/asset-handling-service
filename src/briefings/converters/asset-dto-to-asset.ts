import { AssetType } from "../entity/asset-type.enum";
import { AssetExtension } from "../entity/asset-extension.enum";
import { CreateAssetDTO } from "../dto/create-asset.dto";
import { Asset } from "../entity/asset.entity";
import { Converter } from "./converter.interface";
import { Briefing } from "../entity/briefing.entity";
import { AssetNameHelper } from "../entity/asset-name.helper";

export class AssetDTOToAssetConverter implements Converter<CreateAssetDTO, Asset> {

    public convert(createAssetDTO: CreateAssetDTO): Asset {

        const asset = new Asset();

        asset.type = AssetType.CONTENT_IMAGE;
        asset.extension = AssetExtension.JPG;
        asset.scene = createAssetDTO.scene;
        asset.variant = createAssetDTO.variant;
        asset.camera = createAssetDTO.camera;
        asset.sort_order = null;

        return asset;
    }

    public convertWithAdditionalAttributes(briefing: Briefing, createAssetDTO: CreateAssetDTO): Asset {

        const asset: Asset = this.convert(createAssetDTO);
        const sortOrder = this.getNextSortOrderIndex(briefing.assets);
        asset.sort_order = sortOrder;
        asset.setFilePath(new AssetNameHelper(briefing, asset).buildName())

        return asset;
    }

    protected getNextSortOrderIndex(assets: Asset[]): number {
        const arrayOfNumber = assets.map((asset: Asset) => asset.sort_order);
        const max = Math.max(...arrayOfNumber);
        return max + 1;
    }
}