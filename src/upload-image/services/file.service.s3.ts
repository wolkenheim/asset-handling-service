import { NotFoundException, Injectable } from '@nestjs/common';
import * as config from 'config';
import { FileService } from './file.service.interface';
import { s3 } from '../s3-client';

@Injectable()
export class FileServiceS3 implements FileService {

    async validateFileExists(fileName: string): Promise<boolean> {

        let params = {
            Bucket: config.S3.AWS_BUCKET,
            Key: fileName //'006581bf-47d4-404a-b681-796c878cc631.pdf' 
        };

        try {
            const headCode = await s3.headObject(params).promise();
            //const signedUrl = s3.getSignedUrl('getObject', params);
            return true;
        } catch (headErr) {
            if (headErr.code === 'NotFound') {
                throw new NotFoundException("File not found on S3");
            }
        }
    }
}