import { NotFoundException, Injectable } from '@nestjs/common';
import * as config from 'config';
import { FileService } from './file.service.interface';
import { s3 } from '../s3-client';
// import { createWriteStream } from 'fs';
import { Stream } from 'stream';

@Injectable()
export class FileServiceS3 implements FileService {

    async validateFileExists(fileName: string): Promise<boolean> {

        const params = {
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

    getReadStream(fileName: string): Stream {
        const params = {
            Bucket: config.S3.AWS_BUCKET,
            Key: fileName //'006581bf-47d4-404a-b681-796c878cc631.pdf' 
        };

        try {

            const result = s3.getObject(params).createReadStream();

            return result;

        } catch (headErr) {
            if (headErr.code === 'NotFound') {
                throw new NotFoundException("File not found on S3");
            }
        }
    }

    async getSignedUrl(fileName: string) {
        const params = { Bucket: config.S3.AWS_BUCKET, Key: fileName };

        return await s3.getSignedUrlPromise('putObject', params);

    }


}