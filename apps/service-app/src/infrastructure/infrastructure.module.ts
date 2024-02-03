import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../../../../libs/configuration/src/configuration.module';
import { PrismaModule } from '../../../../libs/prisma/src/prisma.module';
import { NetworkModule } from './network/network.module';

@Module({
  imports: [ConfigurationModule, PrismaModule, NetworkModule],
})
export class InfrastructureModule {}
