import { Injectable } from '@nestjs/common';
import { ConsoleService } from 'nestjs-console';
import { TestdataService } from './testdata.service';

@Injectable()
export class TestdataConsoleService {
    constructor(
        private consoleService: ConsoleService,
        private testdataService: TestdataService,
    ) {
        // get the root cli
        const cli = this.consoleService.getCli();

        // create a single command (See [npm commander arguments/options for more details])
        this.consoleService.createCommand(
            {
                command: 'test-briefing:create',
                description: 'create test briefings'
            },
            this.createTestBriefings,
            cli // attach the command to the cli
        );

        this.consoleService.createCommand(
            {
                command: 'test-briefing:delete',
                description: 'delete test briefings'
            },
            this.deleteTestBriefings,
            cli // attach the command to the cli
        );

    }

    createTestBriefings = async (): Promise<void> => {
        await this.testdataService.createTestBriefings();
    }

    deleteTestBriefings = async (): Promise<void> => {
        await this.testdataService.deleteTestBriefings();
    }
}