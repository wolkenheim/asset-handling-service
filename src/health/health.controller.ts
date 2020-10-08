import { Controller, Get, HttpCode } from '@nestjs/common';
import { HealthCheck, HealthCheckService, MemoryHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private typeORM: TypeOrmHealthIndicator,
        private memory: MemoryHealthIndicator,
    ) { }

    @Get('/readiness')

    @HealthCheck()
    @HttpCode(200)
    readiness() {
        return { message: "all good" }
    }

    @Get('/liveness')
    @HealthCheck()
    liveness() {
        return this.health.check([
            () => this.typeORM.pingCheck('cgi-service'),
        ]);
    }


}
