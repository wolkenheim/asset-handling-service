import { Test } from "@nestjs/testing"
import { plainToClass } from "class-transformer"
import { BriefingDTOToBriefingConverter } from "../converters/briefing-dto-to-briefing"
import { CreateBriefingDTO } from "../dto/create-briefing.dto"
import { TestDataReader } from "../test-helper/test-data-reader"
import { AssetNameHelper } from "./asset-name.helper"
import { AssetDTOToAssetConverter } from "../converters/asset-dto-to-asset";

describe('asset-name-test', () => {
    it('should succeed', async () => {
        const briefingParam = await new TestDataReader().read();
        const createBriefingDTO = plainToClass(CreateBriefingDTO, briefingParam);

        const assetDTOToAssetConverter = new AssetDTOToAssetConverter();
        const briefing = new BriefingDTOToBriefingConverter(assetDTOToAssetConverter).convert(createBriefingDTO);

        describe('it should include sub strings', () => {
            const assetName = new AssetNameHelper(briefing, briefing.assets[0]).buildName();
            expect(true).toEqual(assetName.includes("C01"))
            expect(assetName).toEqual("2020_02_KW50_V01_C01_J123456_image_name_Scene_01");
        })

    })
})



