import { ConfigurationModule } from '@app/configuration/configuration.module';
import { PrismaModule } from '@app/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { ExchangeRateModule } from './exchange-rate/exchange-rate.module';
import { EmailSubscriptionModule } from './email-subscription/email-subscription.module';

@Module({
  imports: [
    ConfigurationModule,
    PrismaModule,
    ExchangeRateModule,
    EmailSubscriptionModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
