import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SendEmailsToSubscribers } from '..';
import { ExchangeRateService } from '../../exchange-rate.service';

@QueryHandler(SendEmailsToSubscribers)
export class SendEmailsToSubscribersHandler
  implements IQueryHandler<SendEmailsToSubscribers>
{
  constructor(private readonly exchangeRateService: ExchangeRateService) {}

  async execute(): Promise<string[]> {
    const { rate } = await this.exchangeRateService.getExchangeRate();
    const emails = await this.exchangeRateService.getSubscribedEmails();

    await this.exchangeRateService.sendExchangeRateEmailToSubscribers(
      emails,
      rate,
    );

    return emails;
  }
}
