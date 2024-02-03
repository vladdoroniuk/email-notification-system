import { Module } from '@nestjs/common';
import { EmailSubscriptionController } from './email-subscription.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateEmailSubscriptionHandler } from './commands/handlers/create-email-subscription.handler';
import { PrometheusModule } from '@app/prometheus/prometheus.module';

@Module({
  imports: [CqrsModule, PrometheusModule],
  controllers: [EmailSubscriptionController],
  providers: [CreateEmailSubscriptionHandler],
})
export class EmailSubscriptionModule {}
