import { Body, Controller, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { AssetUpdateDTO } from "../dto/asset-update.dto";
import { CreateAssetDTO } from "../dto/create-asset.dto";
import { AssetsService } from "../services/assets.service";

@Controller('api/assets')
export class AssetsController {

    constructor(private readonly assetService: AssetsService) { }

    @Post()
    createAsset() {

    }

    @Put("/:id")
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    async updateAsset(@Param('id') id: string, @Body() assetUpdateDTO: AssetUpdateDTO) {
        return await this.assetService.updateAsset(id, assetUpdateDTO);
    }

}