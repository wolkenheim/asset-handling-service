import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BriefingsService } from '../services/briefings.service';
import { CreateAssetDTO } from '../dto/create-asset.dto';
import { CreateBriefingDTO } from '../dto/create-briefing.dto';
import { Asset } from '../entity/asset.entity';
import { Briefing } from '../entity/briefing.entity';

@Controller('briefing')
export class BriefingsController {

    constructor(private briefingsService: BriefingsService) { }

    @Get()
    async getAllBriefings(): Promise<Briefing[]> {
        return await this.briefingsService.getAllBriefings();
    }

    @Get('/:id')
    async getBriefingById(@Param('id') id: string): Promise<Briefing> {
        return await this.briefingsService.getBriefingById(id);
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    async createBriefing(@Body() createBriefingDTO: CreateBriefingDTO): Promise<Briefing> {
        return await this.briefingsService.createBriefing(createBriefingDTO);
    }

    @Post('/:briefingId/add-asset')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    async addAssetToBriefing(@Param('briefingId') briefingId: string, @Body() createAssetDTO: CreateAssetDTO): Promise<Asset> {
        return await this.briefingsService.addAssetToBriefing(briefingId, createAssetDTO);
    }

    @Delete('/:briefingId/delete-asset/:assetId')
    async deleteAsset(
        @Param('briefingId') briefingId: string,
        @Param('assetId') assetId: string,
    ) {
        return await this.briefingsService.deleteAsset(briefingId, assetId);
    }

}
