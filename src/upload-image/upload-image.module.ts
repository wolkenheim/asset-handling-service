import { HttpModule, Module } from '@nestjs/common';
import { UploadProcessor } from './upload.processor';
import { BullModule } from '@nestjs/bull';
import { FileServiceS3 } from './services/file.service.s3';
import { FileUploadService } from './services/file-upload.service';

@Module({
    imports: [
        HttpModule,
        BullModule.registerQueue({
            name: 'image',
            redis: {
                host: 'localhost',
                port: 6379,
            },
        }),
    ],
    providers: [UploadProcessor, FileServiceS3, FileUploadService],
    exports: [FileServiceS3, FileUploadService]
})
export class UploadImageModule { }
