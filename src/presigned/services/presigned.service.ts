import { Injectable } from '@nestjs/common';
import { FileServiceS3 } from 'src/upload-image/services/file.service.s3';
import { RequestUrlDTO } from "../dto/request-url.dto";

@Injectable()
export class PresignedService {
    constructor(private readonly fileService: FileServiceS3) { }

    async getPresignedUrl(requestUrlDTO: RequestUrlDTO) {
        return await this.fileService.getSignedUrl(requestUrlDTO.filePath);
    }

}