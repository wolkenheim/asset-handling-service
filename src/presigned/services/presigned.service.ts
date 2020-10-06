import { Injectable } from '@nestjs/common';
import { FileServiceS3 } from 'src/upload-image/services/file.service.s3';
import { RequestUrlDTO } from "../dto/request-url.dto";
import { v4 as uuidv4 } from 'uuid';
import { PresignedEntity } from '../entity/presigned.entity';

@Injectable()
export class PresignedService {
    constructor(private readonly fileService: FileServiceS3) { }

    async getPresignedUrl(requestUrlDTO: RequestUrlDTO) {

        let filePath = requestUrlDTO.filePath.split('.').pop();

        let hashedName = this.getHashedName(filePath);

        let preSignedUrl = await this.fileService.getSignedUrl(requestUrlDTO.filePath);

        return new PresignedEntity(hashedName, preSignedUrl, requestUrlDTO.filePath);
    }

    getHashedName(filePath: string): string {
        let extension = filePath.split('.').pop();
        let hashedName = uuidv4() + '.' + extension;

        return hashedName;
    }

}