import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { EMAIL_QUEUE, EMAIL_SEND_JOB } from 'libs/utils/consts';
import { InjectQueue } from '@nestjs/bull';
import { Email } from '../interfaces';

@Injectable()
export class EmailProducerService {
  constructor(@InjectQueue(EMAIL_QUEUE) private readonly emailQueue: Queue) {}

  async sendEmailToQueue(data: Email) {
    await this.emailQueue.add(EMAIL_SEND_JOB, data, {
      removeOnComplete: true,
      removeOnFail: true,
    });
  }
}
