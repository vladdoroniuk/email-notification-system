import { PrometheusService } from '@app/prometheus/prometheus.service';
import { Injectable } from '@nestjs/common';
import { CreateEmailSubscription } from 'libs/contracts';

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
