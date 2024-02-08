import {
  Processor,
  Process,
  OnQueueFailed,
  OnQueueCompleted,
} from '@nestjs/bull';
import { Job } from 'bullmq';
import {
  EMAIL_QUEUE,
  EMAIL_SEND_JOB,
  EMAIL_TRANSPORTER,
} from 'libs/utils/consts';
import { Inject } from '@nestjs/common';
import { Transporter } from 'nodemailer';
import { Email } from '../interfaces';
import { PrometheusService } from '@app/prometheus/prometheus.service';

@Processor(EMAIL_QUEUE)
export class EmailConsumerService {
  constructor(
    @Inject(EMAIL_TRANSPORTER) private readonly transporter: Transporter,
    private readonly prometheusService: PrometheusService,
  ) {}

  @OnQueueFailed()
  onFailed() {
    this.prometheusService.increaseSendEmailErrorCounter();
  }

  @OnQueueCompleted()
  onCompleted() {
    this.prometheusService.increaseSendEmailSuccessCounter();
  }

  @Process(EMAIL_SEND_JOB)
  async sendEmail(job: Job<Email>) {
    await this.transporter.sendMail(job.data);
  }
}
