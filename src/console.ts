import { BootstrapConsole } from 'nestjs-console';
import { AppModule } from './app.module';
import { TestdataModule } from './testdata/testdata.module';

const bootstrap = new BootstrapConsole({
    module: TestdataModule,
    useDecorators: true
});
bootstrap.init().then(async (app) => {
    try {
        // init your app
        await app.init();
        // boot the cli
        await bootstrap.boot();
        process.exit(0);
    } catch (e) {
        process.exit(1);
    }
});