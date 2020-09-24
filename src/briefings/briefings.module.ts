import { Module } from '@nestjs/common';
import { BriefingsController } from './briefings.controller';
import { BriefingsService } from './briefings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BriefingRepository } from './briefing.repository';
import { BriefingDTOToBriefingConverter } from './converters/briefing-dto-to-briefing';
import { AssetDTOToAsset } from './converters/asset-dto-to-asset';
import { AssetUploadsController } from './asset-uploads.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([BriefingRepository]),
  ],
  controllers: [BriefingsController, AssetUploadsController],
  providers: [BriefingsService, BriefingDTOToBriefingConverter, AssetDTOToAsset]
})
export class BriefingsModule { }
