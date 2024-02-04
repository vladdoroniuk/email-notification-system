import { Module } from '@nestjs/common';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRateController } from './exchange-rate.controller';
import { NetworkModule } from '@app/network/network.module';
import { SendEmailsToSubscribersHandler } from './queries/handlers';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [NetworkModule, CqrsModule],
  providers: [ExchangeRateService, SendEmailsToSubscribersHandler],
  controllers: [ExchangeRateController],
})
export class ExchangeRateModule {}
