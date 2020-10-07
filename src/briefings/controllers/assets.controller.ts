import { Body, Controller, Delete, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { AssetUpdateDTO } from "../dto/asset-update.dto";
import { AssetCreateDTO } from "../dto/asset-create.dto";
import { AssetsService } from "../services/assets.service";

@Controller('api/assets')
export class AssetsController {

    constructor(
        private readonly assetService: AssetsService,
    ) { }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    async createAsset(
        @Body() assetCreateDTO: AssetCreateDTO
    ) {
        return await this.assetService.addAssetToBriefing(assetCreateDTO.briefing_id, assetCreateDTO);
    }

    @Put("/:assetId")
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    async updateAsset(
        @Param('assetId') assetId: string,
        @Body() assetUpdateDTO: AssetUpdateDTO
    ) {
        return await this.assetService.updateAsset(assetId, assetUpdateDTO);
    }

    @Delete('/:assetId')
    async deleteAsset(
        @Param('assetId') assetId: string,
    ) {
        return await this.assetService.deleteAsset(assetId);
    }

}