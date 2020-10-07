import { Injectable } from '@nestjs/common';
import { CreateBriefingDTO } from '../briefings/dto/create-briefing.dto';
import { BriefingsService } from '../briefings/services/briefings.service';
import { BriefingRepository } from '../briefings/repositories/briefing.repository';
import { TestDataReader } from './test-helper/test-data-reader';

@Injectable()
export class TestdataService {

    constructor(
        private briefingsService: BriefingsService,
        private briefingRepository: BriefingRepository
    ) {
    }

    async createTestBriefings() {

        let briefingParams = await new TestDataReader().read();
        if (!briefingParams.length) return;

        await this.createOneBriefing(briefingParams[0])
        await this.createOneBriefing(briefingParams[1])

    }

    async createOneBriefing(briefingParam) {

        const briefingExisting = await this.briefingRepository.findOne(briefingParam.id);

        if (briefingExisting) {
            console.log("test briefing exists");
            return;
        }

        const createBriefingDTO = this.hydrateDTO(briefingParam);

        const briefing = await this.briefingsService.createBriefing(createBriefingDTO);

    }

    hydrateDTO(briefingParam: any): CreateBriefingDTO {

        const createBriefingDTO = new CreateBriefingDTO();

        createBriefingDTO.id = briefingParam.id;
        createBriefingDTO.content_piece_id = briefingParam.content_piece_id;
        createBriefingDTO.briefing_type = briefingParam.briefing_type;
        createBriefingDTO.team = briefingParam.team;
        createBriefingDTO.description = briefingParam.description;
        createBriefingDTO.jira_ticket_title = briefingParam.jira_ticket_title;
        createBriefingDTO.deadline = new Date(briefingParam.deadline);
        createBriefingDTO.briefing_date = new Date(briefingParam.briefing_date);
        createBriefingDTO.kw = briefingParam.kw;
        createBriefingDTO.camera = briefingParam.camera;
        createBriefingDTO.scene = briefingParam.scene;

        return createBriefingDTO;
    }

    async deleteTestBriefings() {
        let briefingParams = await new TestDataReader().read();
        if (!briefingParams.length) return;

        await this.deleteOneBriefing(briefingParams[0]["id"]);
        await this.deleteOneBriefing(briefingParams[1]["id"]);

    }

    async deleteOneBriefing(briefingId: string) {

        const briefingExisting = await this.briefingRepository.findOne(briefingId);

        if (briefingExisting) {
            await this.briefingRepository.remove(briefingExisting);
            return;
        }
    }

}
