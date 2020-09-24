import { Controller, Get, NotFoundException } from '@nestjs/common';
//import S3 from 'aws-sdk/clients/s3';
import * as config from 'config';
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

@Controller('asset')
export class AssetUploadsController {

    @Get()
    async addUploadToAsset() {

        let params = { Bucket: config.S3.AWS_BUCKET, Key: '006581bf-47d4-404a-b681-796c878cc631.pdf' };

        try {
            const headCode = await s3.headObject(params).promise();
            const signedUrl = s3.getSignedUrl('getObject', params);

            return signedUrl;
        } catch (headErr) {
            if (headErr.code === 'NotFound') {
                throw new NotFoundException("File not found on S3");
            }
        }

    }
}
