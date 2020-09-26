import { Controller, Post, Param, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { CreateUploadDTO } from '../dto/create-upload.dto';
import { UploadsService } from '../services/uploads.service';


@Controller('asset')
export class AssetUploadsController {

    constructor(private readonly uploadsService: UploadsService) { }

    @Post('/:assetId/add-upload')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    async addUploadToAsset(
        @Param('assetId') assetId: string,
        @Body() createUploadDTO: CreateUploadDTO
    ) {
        return await this.uploadsService.addUploadToAsset(createUploadDTO, assetId);

    }
}