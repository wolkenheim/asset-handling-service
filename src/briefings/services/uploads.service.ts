import { Injectable, NotFoundException } from '@nestjs/common';
import { UploadDTOToUploadConverter } from '../converters/upload-dto-to-upload';
import { CreateUploadDTO } from '../dto/create-upload.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { setQueues } from 'bull-board';
import { FileServiceS3 } from 'src/upload-image/services/file.service.s3';
import { QueueNames } from 'src/upload-image/queue-names.enum';
import { FileUploadService } from 'src/upload-image/services/file-upload.service';
import { Asset } from '../entity/asset.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class UploadsService {

    constructor(
        @InjectQueue('image') private readonly imageQueue: Queue,
        private readonly fileService: FileServiceS3,
        @InjectRepository(Asset)
        private readonly assetRepository: Repository<Asset>,
        private readonly uploadDTOToUploadConverter: UploadDTOToUploadConverter,
        private readonly fileUploadService: FileUploadService
    ) {
        this.registerQueuesIntoBullBoard();
    }

    async getAssetById(assetId: string) {

        const asset = await this.assetRepository.findOne(assetId);

        if (!asset) {
            throw new NotFoundException("Asset not found");
        }

        return asset;
    }

    async addUploadToAsset(createUploadDTO: CreateUploadDTO, assetId: string): Promise<Asset> {

        //await this.fileService.validateFileExists(createUploadDTO.hashedName);

        let asset = await this.getAssetById(assetId);

        asset = await this.deleteExistingUploads(asset);

        const upload = this.uploadDTOToUploadConverter.convert(createUploadDTO);
        asset.uploads.push(upload);

        asset.upload_counter++;

        let savedAsset = await this.assetRepository.save(asset);

        //await this.imageQueue.add(QueueNames.COPY, upload);

        return savedAsset;
    }

    async deleteExistingUploads(asset: Asset): Promise<Asset> {

        if (asset.uploads.length > 0) {
            asset.uploads = [];
            this.assetRepository.save(asset);

        }
        return asset;
    }

    async testS3(): Promise<void> {
        await this.fileUploadService.uploadToDam();
    }

    private registerQueuesIntoBullBoard() {
        setQueues([
            this.imageQueue
        ]);
    }
}