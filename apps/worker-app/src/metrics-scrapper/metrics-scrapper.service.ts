import { Injectable } from '@nestjs/common';
import {
  METRICS,
  PROMETHEUS_API_URL,
  SCRAPE_INTERVAL_IN_MS,
} from 'libs/utils/consts';
import { CreateNetworkRequest } from '@app/network/interfaces/create-network-request.interface';
import { NetworkService } from '@app/network/network.service';
import { Interval } from '@nestjs/schedule';
import { PrismaService } from '@app/prisma/prisma.service';
import { PrometheusMetric } from './interfaces/prometheus-metric.interface';

@Injectable()
export class MetricsScrapperService {
  constructor(
    private readonly networkService: NetworkService,
    private readonly prisma: PrismaService,
  ) {}

  @Interval(SCRAPE_INTERVAL_IN_MS)
  private async scrapeMetrics() {
    const metricsToQuery = this.getMetricNames(METRICS);

    for (const metricToQuery of metricsToQuery) {
      const metric = await this.getMetricData(metricToQuery);

      if (metric) {
        await this.saveMetric(metric);
      }
    }
  }

  private getMetricNames(
    metricsObj: Record<string, { name: string; help: string }>,
  ): string[] {
    return Object.values(metricsObj).map((metric) => metric.name);
  }

  private async getMetricData(metricName: string) {
    const urlData: CreateNetworkRequest = {
      baseUrl: PROMETHEUS_API_URL,
      config: {
        params: {
          query: metricName,
        },
      },
    };

    const data = await this.networkService.createNetworkRequest(urlData);
    return data?.data?.data?.result?.[0];
  }

  private async saveMetric(prometheusMetric: PrometheusMetric) {
    const { metric, value } = prometheusMetric;

    const timestamp = new Date(value[0] * 1000);
    const name = metric.__name__;
    const metricValue = value[1];

    await this.prisma.metric.create({
      data: {
        timestamp,
        name,
        value: metricValue,
      },
    });
  }
}
