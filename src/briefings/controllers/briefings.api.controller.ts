import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BriefingsService } from '../services/briefings.service';
import { CreateBriefingDTO } from '../dto/create-briefing.dto';
import { Briefing } from '../entity/briefing.entity';

@Controller('api/briefing')
export class BriefingsApiController {

    constructor(private briefingsService: BriefingsService) { }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    async createBriefing(@Body() createBriefingDTO: CreateBriefingDTO): Promise<Briefing> {
        return await this.briefingsService.createBriefing(createBriefingDTO);
    }

}
