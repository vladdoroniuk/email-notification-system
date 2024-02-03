import { Module } from '@nestjs/common';
import { NetworkModule } from './network/network.module';
import { ConfigurationModule } from '@app/configuration/configuration.module';
import { PrismaModule } from '@app/prisma/prisma.module';
import { PrometheusModule } from '@app/prometheus/prometheus.module';

@Module({
  imports: [ConfigurationModule, PrismaModule, PrometheusModule, NetworkModule],
})
export class InfrastructureModule {}
