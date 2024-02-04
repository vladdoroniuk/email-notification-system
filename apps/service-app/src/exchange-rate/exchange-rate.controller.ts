import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ExchangeRateService } from './exchange-rate.service';
import { ROUTES } from 'libs/utils/consts';
import { QueryBus } from '@nestjs/cqrs';
import { SendEmailsToSubscribers } from './queries';
import { GetExchangeRate } from './interfaces';

@Controller(ROUTES.rate)
export class ExchangeRateController {
  constructor(
    private readonly exchangeRateService: ExchangeRateService,
    private readonly queryBys: QueryBus,
  ) {}

  @Get()
  async getExchangeRate(): Promise<GetExchangeRate> {
    return this.exchangeRateService.getExchangeRate();
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async sendEmailsToSubscribers() {
    await this.queryBys.execute(new SendEmailsToSubscribers());
  }
}
