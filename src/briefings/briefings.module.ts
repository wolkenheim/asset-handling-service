import { Module, MiddlewareConsumer } from '@nestjs/common';
import { BriefingsController } from './briefings.controller';
import { BriefingsService } from './briefings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BriefingRepository } from './briefing.repository';
import { BriefingDTOToBriefingConverter } from './converters/briefing-dto-to-briefing';
import { AssetDTOToAssetConverter } from './converters/asset-dto-to-asset';
import { AssetUploadsController } from './asset-uploads.controller';
import { BriefingsApiController } from './public-api/briefings.api.controller';
import { TokenMiddleware } from './token.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([BriefingRepository]),
  ],
  controllers: [BriefingsController, AssetUploadsController, BriefingsApiController],
  providers: [BriefingsService, BriefingDTOToBriefingConverter, AssetDTOToAssetConverter]
})
export class BriefingsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .forRoutes('api');
  }
}
