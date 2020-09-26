import { Module } from '@nestjs/common';
import { UploadProcessor } from './upload.processor';
import { BullModule } from '@nestjs/bull';
import { FileServiceS3 } from './services/file.service.s3';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'image',
            redis: {
                host: 'localhost',
                port: 6379,
            },
        }),
    ],
    providers: [UploadProcessor, FileServiceS3],
    exports: [FileServiceS3]
})
export class UploadImageModule { }
