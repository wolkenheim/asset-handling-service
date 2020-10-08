import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BriefingsService } from '../services/briefings.service';
import { BriefingCreateDTO } from '../dto/briefing-create.dto';
import { Briefing } from '../entity/briefing.entity';

@Controller('api/briefing')
export class BriefingsController {

    constructor(private briefingsService: BriefingsService) { }

    @Get()
    async getAllBriefings(): Promise<{ data: Briefing[] }> {
        return { data: await this.briefingsService.getAllBriefings() };
    }

    @Get('/:id')
    async getBriefingById(@Param('id') id: string): Promise<{ data: Briefing }> {
        return { data: await this.briefingsService.getBriefingById(id) };
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    async createBriefing(@Body() briefingCreateDTO: BriefingCreateDTO): Promise<Briefing> {
        return await this.briefingsService.createBriefing(briefingCreateDTO);
    }

}
