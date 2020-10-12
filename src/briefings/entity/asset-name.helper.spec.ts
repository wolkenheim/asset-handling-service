
import { plainToClass } from "class-transformer"
import { BriefingDTOToBriefingConverter } from "../converters/briefing-dto-to-briefing"
import { BriefingCreateDTO } from "../dto/briefing-create.dto"
import { AssetNameHelper } from "./asset-name.helper"
import { AssetDTOToAssetConverter } from "../converters/asset-dto-to-asset";
import { TestDataClient } from "../../testdata/test-helper/test-data-client";
import { Briefing } from "./briefing.entity";

describe('asset-name-test', () => {

    let briefingParam = null;
    let briefingCreateDTO: BriefingCreateDTO;
    let assetDTOToAssetConverter: AssetDTOToAssetConverter;
    let briefing: Briefing;

    beforeAll(async () => {
        briefingParam = await TestDataClient.getTestData();
        briefingCreateDTO = plainToClass(BriefingCreateDTO, briefingParam[0]);
        assetDTOToAssetConverter = new AssetDTOToAssetConverter();
        briefing = new BriefingDTOToBriefingConverter(assetDTOToAssetConverter).convert(briefingCreateDTO);
    })

    it('it should include sub strings', async () => {
        const assetName = new AssetNameHelper(briefing, briefing.assets[0]).buildName();
        expect(true).toEqual(assetName.includes("C01"))
        expect(assetName).toEqual("2020_02_KW50_V01_C01_J123456_image_name_Scene_01");
    })

    it('it should include hash', () => {
        briefing.assets[0].hash = '12345';
        const assetName = new AssetNameHelper(briefing, briefing.assets[0]).buildName();

        expect(assetName).toEqual("2020_02_KW50_V01_C01_J123456_image_name_12345_Scene_01");
    })

})



