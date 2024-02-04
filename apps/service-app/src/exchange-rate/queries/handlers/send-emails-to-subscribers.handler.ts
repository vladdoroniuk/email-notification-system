import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from '@app/prisma/prisma.service';
import { SendEmailsToSubscribers } from '..';
// import { PrometheusService } from '@app/prometheus/prometheus.service';
// import { ExchangeRateService } from '../../exchange-rate.service';
import { PartialSubscriptionEmail } from '../../interfaces';

@QueryHandler(SendEmailsToSubscribers)
export class SendEmailsToSubscribersHandler
  implements IQueryHandler<SendEmailsToSubscribers>
{
  constructor(
    private readonly prisma: PrismaService,
    // private readonly prometheusService: PrometheusService,
    //private readonly exchangeRateService: ExchangeRateService,
  ) {}

  async execute(): Promise<PartialSubscriptionEmail[]> {
    // const currentRate = await this.exchangeRateService.getExchangeRate();
    const subscriptions = await this.prisma.subscription.findMany({
      where: {
        status: 'subscribed',
      },
      select: { email: true },
    });

    /* for (const subscription of subscriptions) {
      try {
        await this.queueService.enqueueEmail(
          subscription.email,
          'UAH-to-BTC exchange rate',
          `Current rate: ${currentRate}`,
        );

        this.prometheusService.increaseSendEmailSuccessfulCounter();
      } catch (error) {
        this.prometheusService.increaseSendEmailErrorCounter();
      }
    } */

    return subscriptions;
  }
}
