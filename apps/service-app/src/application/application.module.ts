import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { EmailSubscriptonService, ExchangeRateService } from './services';

@Module({
  imports: [InfrastructureModule],
  providers: [ExchangeRateService, EmailSubscriptonService],
  exports: [ExchangeRateService, EmailSubscriptonService],
})
export class ApplicationModule {}
