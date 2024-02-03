import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { ApplicationModule } from '../application/application.module';
import { ExchangeRateController } from './controllers/rate.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [ExchangeRateController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class PresentationModule {}
