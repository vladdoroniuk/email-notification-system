import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  COINMARKETCAP_API_URL,
  CRON_TIME_ZONE,
  CURRENCIES,
  EMAIL_FROM,
  EMAIL_SUBJECT,
  EMAIL_TEXT,
  EXCHANGE_RATE_CACHE_KEY,
  EXCHANGE_RATE_INTERVAL_IN_MS,
} from 'libs/utils/consts';
import { PrometheusService } from '@app/prometheus/prometheus.service';
import { NetworkService } from '@app/network/network.service';
import { GetExchangeRate } from './interfaces';
import { CreateNetworkRequest } from '@app/network/interfaces/create-network-request.interface';
import { Cron, Interval } from '@nestjs/schedule';
import { EmailProducerService } from '@app/mailer/email-producer.service';
import { PrismaService } from '@app/prisma/prisma.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ExchangeRateService {
  constructor(
    private readonly networkService: NetworkService,
    private readonly configService: ConfigService,
    private readonly prometheusService: PrometheusService,
    private readonly prisma: PrismaService,
    private readonly emailProducerService: EmailProducerService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async getExchangeRate(): Promise<GetExchangeRate> {
    const urlData: CreateNetworkRequest = {
      baseUrl: COINMARKETCAP_API_URL,
      config: {
        params: {
          convert: CURRENCIES.fiat.uah,
        },
        headers: {
          'X-CMC_PRO_API_KEY': this.configService.get<string>(
            'COINMARKETCAP_API_KEY',
          ),
          Accept: 'application/json',
        },
      },
    };

    const { data } = await this.networkService.createNetworkRequest(urlData);
    const rate = this.extractExchangeRate(
      data,
      CURRENCIES.crypto.btc,
      CURRENCIES.fiat.uah,
    );

    this.prometheusService.setExchangeRateGauge(rate);

    return { rate };
  }

  private extractExchangeRate(
    data,
    cryptoSymbol: string,
    fiatSymbol: string,
  ): number {
    const { data: cryptoArray } = data;
    const rateObject = cryptoArray.find(
      (crypto) => crypto.symbol === cryptoSymbol,
    );
    const rate = rateObject.quote[fiatSymbol].price;

    return rate;
  }

  @Interval(EXCHANGE_RATE_INTERVAL_IN_MS)
  async sendExchangeRateToSubscribersWithInterval() {
    const { rate } = await this.getExchangeRate();
    await this.getSubscribedEmailsAndSendExchangeRate(rate);
  }

  @Cron('0 6 * * *', { timeZone: CRON_TIME_ZONE })
  async sendExchangeRateToSubscribersWithSchedule() {
    const { rate } = await this.getExchangeRate();

    const cachedRateSinceLastEmail: number | undefined =
      await this.cacheManager.get(EXCHANGE_RATE_CACHE_KEY);

    if (!cachedRateSinceLastEmail && cachedRateSinceLastEmail !== 0) {
      await this.cacheManager.set(EXCHANGE_RATE_CACHE_KEY, rate);
      await this.getSubscribedEmailsAndSendExchangeRate(rate);
      return;
    }

    const rateDifference =
      Math.abs(rate - cachedRateSinceLastEmail!) / cachedRateSinceLastEmail!;

    if (rateDifference > 0.05) {
      await this.cacheManager.set(EXCHANGE_RATE_CACHE_KEY, rate);
      await this.getSubscribedEmailsAndSendExchangeRate(rate);
    }
  }

  async getSubscribedEmailsAndSendExchangeRate(rate: number) {
    const emails = await this.getSubscribedEmails();
    await this.sendExchangeRateEmailToSubscribers(emails, rate);
  }

  async getSubscribedEmails(): Promise<string[]> {
    const emails = await this.prisma.subscription.findMany({
      where: {
        status: 'subscribed',
      },
      select: { email: true },
    });

    return emails.map((subscription) => subscription.email);
  }

  async sendExchangeRateEmailToSubscribers(emails: string[], rate: number) {
    for (const email of emails) {
      const emailData = {
        from: `${EMAIL_FROM}: ${this.configService.get<string>('SMTP_HOST')!}`,
        to: email,
        subject: EMAIL_SUBJECT,
        text: `${EMAIL_TEXT}: ${rate}`,
      };

      await this.emailProducerService.sendEmailToQueue(emailData);
    }
  }
}
