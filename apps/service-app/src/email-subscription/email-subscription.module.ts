import { Module } from '@nestjs/common';
import { EmailSubscriptonService } from './email-subscription.service';
import { EmailSubscriptionController } from './email-subscription.controller';

@Module({
  providers: [EmailSubscriptonService],
  controllers: [EmailSubscriptionController],
})
export class EmailSubscriptionModule {}
