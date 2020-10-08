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
import { UploadDTOToUploadConverter } from './converters/upload-dto-to-upload';
import { BullModule } from '@nestjs/bull';
import { UploadImageModule } from 'src/upload-image/upload-image.module';
import { UploadRepository } from './repositories/upload.repository';
import { AssetsController } from './controllers/assets.controller';
import { AssetsService } from './services/assets.service';
import { Asset } from './entity/asset.entity';

@Module({
  imports: [
    UploadImageModule,
    BullModule.registerQueue({
      name: 'image',
    }),
    TypeOrmModule.forFeature([BriefingRepository, Asset, UploadRepository]),
  ],
  controllers: [
    AssetsController,
    AssetUploadsController,
    BriefingsController,
    BriefingsApiController
  ],
  providers: [
    AssetsService,
    AssetDTOToAssetConverter,
    BriefingsService,
    BriefingDTOToBriefingConverter,
    UploadDTOToUploadConverter,
    UploadsService,
  ],
  exports: [BriefingsService, TypeOrmModule]
})
export class BriefingsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .forRoutes('api/v1');
  }
}
