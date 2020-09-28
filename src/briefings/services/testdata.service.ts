import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBriefingDTO } from '../dto/create-briefing.dto';
import { BriefingsService } from '../services/briefings.service';
import { BriefingRepository } from '../repositories/briefing.repository';
import { TestDataReader } from '../test-helper/test-data-reader';

@Injectable()
export class TestdataService {

    constructor(
        private readonly briefingsService: BriefingsService,
        private readonly briefingRepository: BriefingRepository
    ) {
        this.createTestBriefing()
            .then(result => { });
    }

    async createTestBriefing() {
        let briefingParam = await new TestDataReader().read();

        const briefingExisting = await this.briefingRepository.findOne(briefingParam.id);

        if (briefingExisting) {
            console.log("test briefing exits");
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

}
