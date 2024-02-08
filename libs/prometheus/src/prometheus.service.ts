import { Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { METRICS } from 'libs/utils/consts';
import { Counter, Gauge } from 'prom-client';

@Injectable()
export class PrometheusService {
  constructor(
    @InjectMetric(METRICS.subscribeEmailCounter.name)
    private readonly subscribeEmailCounter: Counter<string>,
    @InjectMetric(METRICS.unsubscribeEmailCounter.name)
    private readonly unsubscribeEmailCounter: Counter<string>,
    @InjectMetric(METRICS.sendEmailSuccessCounter.name)
    private readonly sendEmailSuccessCounter: Counter<string>,
    @InjectMetric(METRICS.sendEmailErrorCounter.name)
    private readonly sendEmailErrorCounter: Counter<string>,
    @InjectMetric(METRICS.exchangeRateGauge.name)
    private readonly exchangeRateGauge: Gauge<string>,
  ) {}

  increaseSubscribeEmailCounter() {
    this.subscribeEmailCounter.inc();
  }

  increaseUnsubscribeEmailCounter() {
    this.unsubscribeEmailCounter.inc();
  }

  increaseSendEmailSuccessCounter() {
    this.sendEmailSuccessCounter.inc();
  }

  increaseSendEmailErrorCounter() {
    this.sendEmailErrorCounter.inc();
  }

  setExchangeRateGauge(value: number) {
    this.exchangeRateGauge.set(value);
  }
}
