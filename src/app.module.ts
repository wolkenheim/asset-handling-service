import { Module } from '@nestjs/common';
import { BriefingsModule } from './briefings/briefings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TerminusModule,
    BriefingsModule
  ],
  controllers: [HealthController],
})
export class AppModule { }
