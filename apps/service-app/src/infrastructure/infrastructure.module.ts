import { Module } from '@nestjs/common';
import { ConfigurationModule } from './configuration/configuration.module';
import { PrismaModule } from '../../../../libs/prisma/src/prisma.module';
import { NewtorkModule } from './network/network.module';

@Module({
  imports: [ConfigurationModule, PrismaModule, NewtorkModule],
})
export class InfrastructureModule {}
