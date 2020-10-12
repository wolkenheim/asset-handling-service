import { Injectable } from '@nestjs/common';
import { FileServiceS3 } from 'src/upload-image/services/file.service.s3';
import { RequestUrlDTO } from "../dto/request-url.dto";
import { v4 as uuidv4 } from 'uuid';
import { PresignedEntity } from '../entity/presigned.entity';

@Injectable()
export class PresignedService {
    constructor(private readonly fileService: FileServiceS3) { }

    async getPresignedUrl(requestUrlDTO: RequestUrlDTO): Promise<PresignedEntity> {

        const filePath = requestUrlDTO.filePath.split('.').pop();

        const hashedName = this.getHashedName(filePath);

        const preSignedUrl = await this.fileService.getSignedUrl(hashedName);

        return new PresignedEntity(hashedName, preSignedUrl, requestUrlDTO.filePath);
    }

    getHashedName(filePath: string): string {
        const extension = filePath.split('.').pop();
        const hashedName = uuidv4() + '.' + extension;

        return hashedName;
    }

}