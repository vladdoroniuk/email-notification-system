import { Global, Module } from '@nestjs/common';
import {
  PrometheusModule as PromModule,
  makeCounterProvider,
  makeGaugeProvider,
} from '@willsoto/nestjs-prometheus';
import { PrometheusService } from './prometheus.service';
import { METRICS } from 'libs/utils';

@Global()
@Module({
  imports: [
    PromModule.register({
      defaultMetrics: {
        enabled: false,
      },
    }),
  ],
  providers: [
    PrometheusService,
    makeCounterProvider({
      name: METRICS.subscribeEmailCounter.name,
      help: METRICS.subscribeEmailCounter.help,
    }),
    makeCounterProvider({
      name: METRICS.unsubscribeEmailCounter.name,
      help: METRICS.unsubscribeEmailCounter.help,
    }),
    makeCounterProvider({
      name: METRICS.sendEmailSuccessfulCounter.name,
      help: METRICS.sendEmailSuccessfulCounter.help,
    }),
    makeCounterProvider({
      name: METRICS.sendEmailErrorCounter.name,
      help: METRICS.sendEmailErrorCounter.help,
    }),
    makeGaugeProvider({
      name: METRICS.exchangeRateGauge.name,
      help: METRICS.exchangeRateGauge.help,
    }),
  ],
  exports: [PrometheusService],
})
export class PrometheusModule {}
