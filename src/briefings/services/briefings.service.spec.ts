import { BriefingDTOToBriefingConverter } from "../converters/briefing-dto-to-briefing";
import { Briefing } from "../entity/briefing.entity";
import { BriefingRepository } from "../repositories/briefing.repository";
import { BriefingsService } from "./briefings.service";
import { TestDataReader } from "../../testdata/test-helper/test-data-reader";
import { plainToClass } from "class-transformer";

jest.mock("../repositories/briefing.repository");

describe("BriefingsService", () => {
    let briefingsService: BriefingsService;
    let briefingRepository: BriefingRepository;
    let briefingDTOToBriefingConverter: BriefingDTOToBriefingConverter;

    let result: Promise<Briefing[]> = null;

    const getOneTestBriefing = async () => {
        const briefingParam = await new TestDataReader().read();
        const briefingOne = plainToClass(Briefing, briefingParam[0]);
        return briefingOne;
    }

    beforeEach(async () => {
        const testBriefing = await getOneTestBriefing();
        briefingRepository = new BriefingRepository();
        briefingsService = new BriefingsService(briefingRepository, briefingDTOToBriefingConverter);

        result = new Promise((resolve, reject) => {
            resolve([testBriefing]);
        })

        jest.spyOn(briefingRepository, 'getBriefings').mockImplementation(() => result);
    })

    describe("findAll", () => {
        it('should return a list of briefings', async () => {
            expect(await briefingsService.getAllBriefings()).toBe(await result);
        })
    })

})