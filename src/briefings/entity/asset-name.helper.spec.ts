import { Test } from "@nestjs/testing"
import { plainToClass } from "class-transformer"
import { BriefingDTOToBriefingConverter } from "../converters/briefing-dto-to-briefing"
import { TestdataService } from "../services/testdata.service"
import { TestDataReader } from "../test-helper/test-data-reader"
import { AssetNameHelper } from "./asset-name.helper"
import { Asset } from "./asset.entity"
import { Briefing } from "./briefing.entity"

describe('asset-name-test', () => {
    it('should succeed', async () => {
        const briefingParam = await new TestDataReader().read();
        const briefing = plainToClass(Briefing, briefingParam);

        const asset = new BriefingDTOToBriefingConverter().createFirstAssetForBriefing(briefing);
        briefing.assets = [];
        briefing.assets.push(asset);

        describe('it should include sub strings', () => {

            const assetName = new AssetNameHelper(briefing, asset).buildName();
            expect(true).toEqual(assetName.includes("C01"))

        })

    })
})



