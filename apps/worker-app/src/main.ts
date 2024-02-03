import { NestFactory } from '@nestjs/core';
import { WorkerAppModule } from './worker-app.module';

async function bootstrap() {
  const app = await NestFactory.create(WorkerAppModule);
  await app.listen(3000);
}
bootstrap();
