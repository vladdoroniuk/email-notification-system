import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueService } from './queue.service';
import { MailerModule } from '@app/mailer/mailer.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_URL,
        port: +process.env.REDIS_PORT!,
      },
    }),
    BullModule.registerQueue({
      name: 'email',
    }),
    MailerModule,
  ],
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueModule {}
