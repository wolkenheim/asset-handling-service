import { Module } from '@nestjs/common';
import { TestdataConsoleService } from './testdata.console.service';
import { ConsoleModule } from 'nestjs-console';
import { BriefingsModule } from 'src/briefings/briefings.module';
import { typeOrmConfig } from '../config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestdataService } from './testdata.service';

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