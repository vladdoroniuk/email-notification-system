import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { ApplicationModule } from '../application/application.module';
import {
  EmailSubscriptionController,
  ExchangeRateController,
} from './controllers';

@Module({
  imports: [ApplicationModule],
  controllers: [ExchangeRateController, EmailSubscriptionController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class PresentationModule {}
