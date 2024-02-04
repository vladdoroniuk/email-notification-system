import { Module } from '@nestjs/common';
import { MetricsScrapperService } from './metrics-scrapper.service';
import { NetworkModule } from '@app/network/network.module';

@Module({
  imports: [NetworkModule],
  providers: [MetricsScrapperService],
})
export class MetricsScrapperModule {}
