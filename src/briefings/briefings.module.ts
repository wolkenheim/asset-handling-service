import { Module, MiddlewareConsumer } from '@nestjs/common';
import { BriefingsController } from './controllers/briefings.controller';
import { BriefingsService } from './services/briefings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BriefingRepository } from './repositories/briefing.repository';
import { BriefingDTOToBriefingConverter } from './converters/briefing-dto-to-briefing';
import { AssetDTOToAssetConverter } from './converters/asset-dto-to-asset';
import { AssetUploadsController } from './controllers/asset-uploads.controller';
import { BriefingsApiController } from './controllers/briefings.api.controller';
import { TokenMiddleware } from './middlewares/token.middleware';
import { UploadsService } from './services/uploads.service';
import { AssetRepository } from './repositories/asset.repository';
import { FileServiceS3 } from './services/file.service.s3';
import { UploadDTOToUploadConverter } from './converters/upload-dto-to-upload';

@Module({
  imports: [
    TypeOrmModule.forFeature([BriefingRepository, AssetRepository]),
  ],
  controllers: [BriefingsController, AssetUploadsController, BriefingsApiController],
  providers: [
    BriefingsService,
    UploadsService,
    BriefingDTOToBriefingConverter,
    AssetDTOToAssetConverter,
    UploadDTOToUploadConverter,
    FileServiceS3,
    UploadsService
  ]
})
export class BriefingsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .forRoutes('api');
  }
}
