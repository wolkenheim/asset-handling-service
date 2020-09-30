import { Test } from "@nestjs/testing"
import { plainToClass } from "class-transformer"
import { BriefingDTOToBriefingConverter } from "../converters/briefing-dto-to-briefing"
import { CreateBriefingDTO } from "../dto/create-briefing.dto"
import { TestDataReader } from "../test-helper/test-data-reader"
import { AssetNameHelper } from "./asset-name.helper"

describe('asset-name-test', () => {
    it('should succeed', async () => {
        const briefingParam = await new TestDataReader().read();
        const createBriefingDTO = plainToClass(CreateBriefingDTO, briefingParam);

        const briefing = new BriefingDTOToBriefingConverter().convert(createBriefingDTO);

        describe('it should include sub strings', () => {
            const assetName = new AssetNameHelper(briefing, briefing.assets[0]).buildName();
            expect(true).toEqual(assetName.includes("C01"))
        })

    })
})



