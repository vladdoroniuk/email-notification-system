import { Module } from '@nestjs/common';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRateController } from './exchange-rate.controller';
import { NetworkModule } from '../network-request/network-request.module';

@Module({
  imports: [NetworkModule],
  providers: [ExchangeRateService],
  controllers: [ExchangeRateController],
})
export class ExchangeRateModule {}
