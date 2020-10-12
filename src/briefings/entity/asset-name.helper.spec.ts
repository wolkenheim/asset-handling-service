
import { plainToClass } from "class-transformer"
import { BriefingDTOToBriefingConverter } from "../converters/briefing-dto-to-briefing"
import { BriefingCreateDTO } from "../dto/briefing-create.dto"
import { AssetNameHelper } from "./asset-name.helper"
import { AssetDTOToAssetConverter } from "../converters/asset-dto-to-asset";
import { TestDataClient } from "../../testdata/test-helper/test-data-client";

describe('asset-name-test', () => {
    it('should succeed', async () => {
        const briefingParam = await TestDataClient.getTestData();

        const briefingCreateDTO = plainToClass(BriefingCreateDTO, briefingParam[0]);

        const assetDTOToAssetConverter = new AssetDTOToAssetConverter();
        const briefing = new BriefingDTOToBriefingConverter(assetDTOToAssetConverter).convert(briefingCreateDTO);

        describe('it should include sub strings', () => {
            const assetName = new AssetNameHelper(briefing, briefing.assets[0]).buildName();

            expect(true).toEqual(assetName.includes("C01"))
            expect(assetName).toEqual("2020_02_KW50_V01_C01_J123456_image_name_Scene_01");
        })

    })
})



