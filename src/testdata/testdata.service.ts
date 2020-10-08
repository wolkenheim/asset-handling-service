import { Injectable } from '@nestjs/common';
import { BriefingCreateDTO } from '../briefings/dto/briefing-create.dto';
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

        const briefingParams = await new TestDataReader().read();
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

        const briefingCreateDTO = this.hydrateDTO(briefingParam);

        const briefing = await this.briefingsService.createBriefing(briefingCreateDTO);

    }

    hydrateDTO(briefingParam: any): BriefingCreateDTO {

        const briefingCreateDTO = new BriefingCreateDTO();

        briefingCreateDTO.id = briefingParam.id;
        briefingCreateDTO.content_piece_id = briefingParam.content_piece_id;
        briefingCreateDTO.briefing_type = briefingParam.briefing_type;
        briefingCreateDTO.team = briefingParam.team;
        briefingCreateDTO.description = briefingParam.description;
        briefingCreateDTO.jira_ticket_title = briefingParam.jira_ticket_title;
        briefingCreateDTO.deadline = new Date(briefingParam.deadline);
        briefingCreateDTO.briefing_date = new Date(briefingParam.briefing_date);
        briefingCreateDTO.kw = briefingParam.kw;
        briefingCreateDTO.camera = briefingParam.camera;
        briefingCreateDTO.scene = briefingParam.scene;

        return briefingCreateDTO;
    }

    async deleteTestBriefings() {
        const briefingParams = await new TestDataReader().read();
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
