import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { EMAIL_QUEUE, EMAIL_TRANSPORTER } from 'libs/utils/consts';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import { EmailProducerService } from './email-producer.service';
import { EmailConsumerService } from './email-consumer.service';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: EMAIL_QUEUE,
    }),
    MailerModule,
  ],
  providers: [
    {
      provide: EMAIL_TRANSPORTER,
      useFactory: (configService: ConfigService): Transporter => {
        const mailerOptions = {
          host: configService.get<string>('SMTP_HOST'),
          port: configService.get<number>('SMTP_PORT'),
          secure:
            configService.get<string>('SMTP_SECURE')!.toLowerCase() === 'true'
              ? true
              : false,
          auth: {
            user: configService.get<string>('SMTP_USER'),
            pass: configService.get<string>('SMTP_PASSWORD'),
          },
        };

        return nodemailer.createTransport(mailerOptions);
      },
      inject: [ConfigService],
    },
    EmailProducerService,
    EmailConsumerService,
  ],
  exports: [EmailProducerService],
})
export class MailerModule {}
