import { PrometheusService } from '@app/prometheus/prometheus.service';
import { Injectable } from '@nestjs/common';
import { CreateEmailSubscription } from './interfaces/email-subscription.interface';

@Injectable()
export class EmailSubscriptonService {
  constructor(private readonly prometheusService: PrometheusService) {}

  async createEmailSubscription(
    data: CreateEmailSubscription,
  ): Promise<string> {
    this.prometheusService.increaseSubscribeEmailCounter();
    const info = await this.prometheusService.getSubscribeEmailCounter();
    console.log(info);
    return data.email;
  }
}
