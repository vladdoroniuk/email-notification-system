import { MailerService } from '@app/mailer/mailer.service';
import { Injectable } from '@nestjs/common';
import { Queue, Worker } from 'bullmq';

@Injectable()
export class QueueService {
  private readonly emailQueue: Queue;

  constructor(private readonly mailerService: MailerService) {
    this.emailQueue = new Queue('email');
    this.initWorker();
  }

  private initWorker() {
    const emailWorker = new Worker('email', async (job) => {
      const { to, subject, text } = job.data;
      await this.mailerService.sendEmail(to, subject, text);
    });
  }

  async enqueueEmail(to: string, subject: string, text: string): Promise<void> {
    await this.emailQueue.add('send-email', { to, subject, text });
  }
}
