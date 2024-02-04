import { Module } from '@nestjs/common';
import { ConfigurationModule } from '@app/configuration/configuration.module';
import { PrismaModule } from '@app/prisma/prisma.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MetricsScrapperModule } from './metrics-scrapper/metrics-scrapper.module';

@Module({
  imports: [
    ConfigurationModule,
    PrismaModule,
    ScheduleModule.forRoot(),
    MetricsScrapperModule,
  ],
})
export class AppModule {}
