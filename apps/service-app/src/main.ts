import { NestFactory } from '@nestjs/core';
import { ExchangeRateModule } from './exchange-rate.module';

async function bootstrap() {
  const app = await NestFactory.create(ExchangeRateModule);
  await app.listen(3000);
}
bootstrap();
