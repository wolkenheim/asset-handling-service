import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TestdataConsoleService } from './testdata.console.service';
import { ConsoleModule } from 'nestjs-console';
import { BriefingsModule } from 'src/briefings/briefings.module';
import { typeOrmConfig } from '../config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestdataService } from './testdata.service';
import { BriefingRepository } from 'src/briefings/repositories/briefing.repository';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        ConsoleModule,
        BriefingsModule,
    ],
    providers: [
        TestdataService,
        TestdataConsoleService,
    ],
    exports: [TestdataConsoleService]
})
export class TestdataModule { }