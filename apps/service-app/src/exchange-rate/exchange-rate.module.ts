import { Module } from '@nestjs/common';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRateController } from './exchange-rate.controller';
import { NetworkModule } from '@app/network/network.module';
import { SendEmailsToSubscribersHandler } from './queries/handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { MailerModule } from '@app/mailer/mailer.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    NetworkModule,
    CqrsModule,
    MailerModule,
    ScheduleModule.forRoot(),
    CacheModule.register(),
  ],
  providers: [ExchangeRateService, SendEmailsToSubscribersHandler],
  exports: [ExchangeRateService],
  controllers: [ExchangeRateController],
})
export class ExchangeRateModule {}
