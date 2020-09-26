import { Module } from '@nestjs/common';
import { BriefingsModule } from './briefings/briefings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';
import { BullModule } from '@nestjs/bull';
import { UploadImageModule } from './upload-image/upload-image.module';

@Module({
  imports: [

    TypeOrmModule.forRoot(typeOrmConfig),
    TerminusModule,
    BriefingsModule,
    UploadImageModule
  ],
  controllers: [HealthController],
})
export class AppModule { }
