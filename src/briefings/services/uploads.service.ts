import { Injectable } from '@nestjs/common';
import { UploadDTOToUploadConverter } from '../converters/upload-dto-to-upload';

import { CreateUploadDTO } from '../dto/create-upload.dto';
import { AssetRepository } from '../repositories/asset.repository';
import { FileService } from './file.service.interface';
import { FileServiceS3 } from './file.service.s3';


@Injectable()
export class UploadsService {

    constructor(
        private readonly fileService: FileServiceS3,
        private readonly assetRepository: AssetRepository,
        private readonly uploadDTOToUploadConverter: UploadDTOToUploadConverter,
    ) { }

    async addUploadToAsset(createUploadDTO: CreateUploadDTO, assetId: string) {
        //await this.fileService.validateFileExists(createUploadDTO.hashedName);

        const upload = this.uploadDTOToUploadConverter.convert(createUploadDTO);

        const asset = await this.assetRepository.findOne(assetId);
        asset.uploads.push(upload);

        return await this.assetRepository.save(asset);

    }
}