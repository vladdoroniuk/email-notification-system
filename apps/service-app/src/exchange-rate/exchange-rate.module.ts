import { Module } from '@nestjs/common';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRateController } from './exchange-rate.controller';
import { NetworkModule } from '@app/network/network.module';

@Module({
  imports: [NetworkModule],
  providers: [ExchangeRateService],
  controllers: [ExchangeRateController],
})
export class ExchangeRateModule {}
