import { AssetCreateDTO } from '../dto/asset-create.dto';
import { AssetExtension } from '../entity/asset-extension.enum';
import { AssetType } from '../entity/asset-type.enum';
import { Asset } from '../entity/asset.entity';
import { AssetDTOToAssetConverter } from './asset-dto-to-asset';

describe("test converter", () => {

    let getAssetCreateDTO = () => {
        let assetCreateDTO = new AssetCreateDTO();
        assetCreateDTO.briefing_id = "d2d730ef-dee6-40b8-918d-6252f17b34be";
        assetCreateDTO.variant = 2;
        assetCreateDTO.camera = 3;
        assetCreateDTO.extension = AssetExtension.PNG;
        assetCreateDTO.type = AssetType.PRODUCT_IMAGE;

        return assetCreateDTO;
    }


    it("should convert dto to asset", () => {
        let assetDTOToAssetConverter: AssetDTOToAssetConverter = new AssetDTOToAssetConverter;
        let asset: Asset = assetDTOToAssetConverter.convert(getAssetCreateDTO());

        expect(asset).toHaveProperty('type');
        expect(asset).toHaveProperty('extension');
        expect(asset).toHaveProperty('variant');
        expect(asset).toHaveProperty('camera');

        expect(asset.type).toEqual(AssetType.PRODUCT_IMAGE);
        expect(asset.extension).toEqual(AssetExtension.PNG);
        expect(asset.variant).toEqual(2);
        expect(asset.camera).toEqual(3);

    });
});