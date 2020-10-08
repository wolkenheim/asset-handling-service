import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BriefingsService } from '../services/briefings.service';
import { BriefingCreateDTO } from '../dto/briefing-create.dto';
import { Briefing } from '../entity/briefing.entity';

@Controller('api/v1/briefing')
export class BriefingsApiController {

    constructor(private briefingsService: BriefingsService) { }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    async createBriefing(@Body() briefingCreateDTO: BriefingCreateDTO): Promise<Briefing> {
        return await this.briefingsService.createBriefing(briefingCreateDTO);
    }

}
