import { Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { METRICS } from 'libs/utils/consts';
import { register, Counter, Gauge } from 'prom-client';

@Injectable()
export class PrometheusService {
  constructor(
    @InjectMetric(METRICS.subscribeEmailCounter.name)
    private readonly subscribeEmailCounter: Counter<string>,
    @InjectMetric(METRICS.unsubscribeEmailCounter.name)
    private readonly unsubscribeEmailCounter: Counter<string>,
    @InjectMetric(METRICS.sendEmailSuccessfulCounter.name)
    private readonly sendEmailSuccessfulCounter: Counter<string>,
    @InjectMetric(METRICS.sendEmailErrorCounter.name)
    private readonly sendEmailErrorCounter: Counter<string>,
    @InjectMetric(METRICS.exchangeRateGauge.name)
    private readonly exchangeRateGauge: Gauge<string>,
  ) {}

  async getMetrics() {
    return register.metrics();
  }

  increaseSubscribeEmailCounter() {
    this.subscribeEmailCounter.inc();
  }

  increaseUnsubscribeEmailCounter() {
    this.unsubscribeEmailCounter.inc();
  }

  increasSendEmailSuccessfulCounter() {
    this.sendEmailSuccessfulCounter.inc();
  }

  increaseSendEmailErrorCounter() {
    this.sendEmailErrorCounter.inc();
  }

  setExchangeRateGauge(value: number) {
    this.exchangeRateGauge.set(value);
  }
}
