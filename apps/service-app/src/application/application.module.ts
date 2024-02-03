import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { ExchangeRateService } from './services/exchange-rate.service';

@Module({
  imports: [InfrastructureModule],
  providers: [ExchangeRateService],
  exports: [ExchangeRateService],
})
export class ApplicationModule {}
