import { Injectable, NotFoundException } from '@nestjs/common';
import { UploadDTOToUploadConverter } from '../converters/upload-dto-to-upload';
import { CreateUploadDTO } from '../dto/create-upload.dto';
import { AssetRepository } from '../repositories/asset.repository';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { setQueues } from 'bull-board';
import { FileServiceS3 } from 'src/upload-image/services/file.service.s3';
import { QueueNames } from 'src/upload-image/queue-names.enum';

@Injectable()
export class UploadsService {

    constructor(
        @InjectQueue('image') private readonly imageQueue: Queue,
        private readonly fileService: FileServiceS3,
        private readonly assetRepository: AssetRepository,
        private readonly uploadDTOToUploadConverter: UploadDTOToUploadConverter,
    ) {
        this.registerQueuesIntoBullBoard();
    }

    async addUploadToAsset(createUploadDTO: CreateUploadDTO, assetId: string) {
        // @todo: enable validation
        //await this.fileService.validateFileExists(createUploadDTO.hashedName);

        const upload = this.uploadDTOToUploadConverter.convert(createUploadDTO);

        const asset = await this.assetRepository.findOne(assetId);

        if (!asset) {
            throw new NotFoundException("Asset not found");
        }

        asset.uploads.push(upload);

        let result = await this.assetRepository.save(asset);


        await this.imageQueue.add(QueueNames.COPY, upload);

        return result;

    }


    private registerQueuesIntoBullBoard() {
        setQueues([
            this.imageQueue
        ]);
    }
}