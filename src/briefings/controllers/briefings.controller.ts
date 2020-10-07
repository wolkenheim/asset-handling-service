import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { BriefingsService } from '../services/briefings.service';
import { AssetCreateDTO } from '../dto/asset-create.dto';
import { CreateBriefingDTO } from '../dto/create-briefing.dto';
import { Asset } from '../entity/asset.entity';
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
    async createBriefing(@Body() createBriefingDTO: CreateBriefingDTO): Promise<Briefing> {
        return await this.briefingsService.createBriefing(createBriefingDTO);
    }

}
