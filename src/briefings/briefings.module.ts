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
import { UploadDTOToUploadConverter } from './converters/upload-dto-to-upload';
import { BullModule } from '@nestjs/bull';
import { UploadImageModule } from 'src/upload-image/upload-image.module';
import { TestdataService } from './services/testdata.service';

@Module({
  imports: [
    UploadImageModule,
    BullModule.registerQueue({
      name: 'image',
    }),
    TypeOrmModule.forFeature([BriefingRepository, AssetRepository]),
  ],
  controllers: [BriefingsController, AssetUploadsController, BriefingsApiController],
  providers: [
    BriefingsService,
    UploadsService,
    BriefingDTOToBriefingConverter,
    AssetDTOToAssetConverter,
    UploadDTOToUploadConverter,
    UploadsService,
    TestdataService
  ]
})
export class BriefingsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .forRoutes('api');
  }
}
