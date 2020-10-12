import { Controller, Get, Post, Param, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { UploadCreateDTO } from '../dto/upload-create.dto';
import { UploadsService } from '../services/uploads.service';


@Controller('api/assets')
export class AssetUploadsController {

    constructor(private readonly uploadsService: UploadsService) { }

    @Post('/:assetId/create-upload')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    async addUploadToAsset(
        @Param('assetId') assetId: string,
        @Body() uploadCreateDTO: UploadCreateDTO
    ) {
        return await this.uploadsService.addUploadToAsset(uploadCreateDTO, assetId);
    }

    @Post('/:assetId/update-upload')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    async updateUploadOnAsset(
        @Param('assetId') assetId: string,
        @Body() uploadCreateDTO: UploadCreateDTO
    ) {
        return await this.uploadsService.addUploadToAsset(uploadCreateDTO, assetId);
    }

    @Get('/test')
    async testS3() {
        return await this.uploadsService.testS3();
    }
}
