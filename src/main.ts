import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { UI } from 'bull-board';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.use('/admin/queues', UI);
  await app.listen(config.get('server.port'));
}
bootstrap();
