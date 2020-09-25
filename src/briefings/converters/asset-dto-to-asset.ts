import { AssetType } from "../asset-types.enum";
import { CreateAssetDTO } from "../dto/create-asset.dto";
import { Asset } from "../entity/asset.entity";
import { Converter } from "./converter.interface";
import { Briefing } from "../entity/briefing.entity";

export class AssetDTOToAssetConverter implements Converter<CreateAssetDTO, Asset> {
    public convert(createAssetDTO: CreateAssetDTO): Asset {

        const asset = new Asset();

        asset.type = AssetType.CONTENT_IMAGE;
        asset.scene = createAssetDTO.scene;
        asset.variant = createAssetDTO.variant;
        asset.camera = createAssetDTO.camera;
        asset.sort_order = null;

        return asset;
    }

    public convertWithSortOrder(briefing: Briefing, createAssetDTO: CreateAssetDTO): Asset {

        const asset: Asset = this.convert(createAssetDTO);
        const sortOrder = this.getNextSortOrderIndex(briefing.assets);
        asset.sort_order = sortOrder

        return asset;
    }

    protected getNextSortOrderIndex(assets: Asset[]): number {
        const arrayOfNumber = assets.map((asset: Asset) => asset.sort_order);
        const max = Math.max(...arrayOfNumber);
        return max + 1;
    }
}