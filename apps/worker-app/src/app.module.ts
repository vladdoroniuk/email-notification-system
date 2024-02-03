import { Module } from '@nestjs/common';
import { ConfigurationModule } from '@app/configuration/configuration.module';
import { PrismaModule } from '@app/prisma/prisma.module';

@Module({
  imports: [ConfigurationModule, PrismaModule],
})
export class AppModule {}
