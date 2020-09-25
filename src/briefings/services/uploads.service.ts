import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import * as config from 'config';
import { CreateUploadDTO } from '../dto/create-upload.dto';
const AWS = require('aws-sdk');
const s3 = new AWS.S3({ region: 'eu-central-1' });

@Injectable()
export class UploadsService {

    async addUploadToAsset(createUploadDTO: CreateUploadDTO,) {
        await this.validateFileExists(createUploadDTO.hashedName);
    }

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