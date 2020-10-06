import { Module } from '@nestjs/common';
import { UploadImageModule } from 'src/upload-image/upload-image.module';
import { PresignedController } from './controllers/presigned.controller';
import { PresignedService } from './services/presigned.service';

@Module({
    imports: [UploadImageModule],
    controllers: [PresignedController],
    providers: [PresignedService]
})
export class PresignedModule { }
