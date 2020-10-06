import { Module } from '@nestjs/common';
import { BriefingsModule } from './briefings/briefings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';
import { BullModule } from '@nestjs/bull';
import { PresignedModule } from './presigned/presigned.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TerminusModule,
    BriefingsModule,
    PresignedModule
  ],
  controllers: [HealthController],
})
export class AppModule { }
