import { Module } from '@nestjs/common';
import { PresentationModule } from './presentation/presentation.module';
import { ApplicationModule } from './application/application.module';
import { DomainModule } from './domain/domain.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [
    PresentationModule,
    ApplicationModule,
    DomainModule,
    InfrastructureModule,
  ],
})
export class AppModule {}
