import { BriefingDTOToBriefingConverter } from "../converters/briefing-dto-to-briefing";
import { Briefing } from "../entity/briefing.entity";
import { BriefingRepository } from "../repositories/briefing.repository";
import { BriefingsService } from "./briefings.service";
import { plainToClass } from "class-transformer";
import { BriefingCreateDTO } from "../dto/briefing-create.dto";
import { AssetDTOToAssetConverter } from "../converters/asset-dto-to-asset";
import { testBriefingJSON } from "../../testdata/test-helper/json-parser";
import { TestDataClient } from '../../testdata/test-helper/test-data-client';

describe("BriefingsService", () => {
    let briefingsService: BriefingsService;
    let briefingRepository: BriefingRepository;
    let briefingDTOToBriefingConverter: BriefingDTOToBriefingConverter;


    const getOneTestBriefing = async () => {
        const briefingParam: testBriefingJSON = await TestDataClient.getTestData();
        const briefingOne = plainToClass(Briefing, briefingParam[0]);
        return briefingOne;
    }

    const getOneTestBriefingCreateDTO = async () => {
        const briefingParam: testBriefingJSON = await TestDataClient.getTestData();
        const briefingOne = plainToClass(BriefingCreateDTO, briefingParam[0]);
        return briefingOne;
    }

    beforeEach(async () => {
        briefingRepository = new BriefingRepository();
        briefingDTOToBriefingConverter = new BriefingDTOToBriefingConverter(new AssetDTOToAssetConverter());
        briefingsService = new BriefingsService(briefingRepository, briefingDTOToBriefingConverter);
    })

    describe("getBriefings", () => {
        it('should return a list of briefings', async () => {
            const testBriefing = await getOneTestBriefing();
            let getBriefings: Promise<Briefing[]> = new Promise((resolve, reject) => {
                resolve([testBriefing]);
            })
            briefingRepository.getBriefings = jest.fn(() => getBriefings);
            expect(await briefingsService.getAllBriefings()).toBe(await getBriefings);
        })
    })

    describe("createBriefing", () => {
        it('should throw an error when trying to insert a briefing with the same UUID twice', async () => {
            const testBriefing = await getOneTestBriefing();
            let briefingOneResult: Promise<Briefing> = new Promise((resolve, reject) => {
                resolve(testBriefing);
            })

            let testBriefingCreateDTO = await getOneTestBriefingCreateDTO();

            const spy = jest.spyOn(briefingRepository, 'findOne').mockImplementation(() => briefingOneResult);

            try {
                await briefingsService.createBriefing(testBriefingCreateDTO)
            } catch (e) {
                expect(spy).toHaveBeenCalled();
                expect(e.message).toMatch('Briefing UUID already exists');
            }
        })

        it('should create a new briefing', async () => {

            let findOneResult: Promise<Briefing> = new Promise((resolve, reject) => {
                resolve(undefined);
            })

            const testBriefing = await getOneTestBriefing();
            let saveResult: Promise<Briefing> = new Promise((resolve, reject) => {
                resolve(testBriefing);
            })

            let testBriefingCreateDTO = await getOneTestBriefingCreateDTO();

            jest.spyOn(briefingRepository, 'findOne').mockImplementation(() => findOneResult);
            let saveSpy = jest.spyOn(briefingRepository, 'save').mockImplementation(() => saveResult);

            let createResult = await briefingsService.createBriefing(testBriefingCreateDTO)

            expect(saveSpy).toHaveBeenCalled();
            expect(createResult).toHaveProperty('id');
            expect(createResult).toHaveProperty('team');

        })
    })

})