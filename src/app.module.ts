import { Module } from '@nestjs/common';
import { BriefingsModule } from './briefings/briefings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    BriefingsModule
  ],
})
export class AppModule { }
