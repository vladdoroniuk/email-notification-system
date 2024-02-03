import { Controller, Get } from '@nestjs/common';
import { GetExchangeRate } from '../../../../../libs/contracts';
import { ExchangeRateService } from '../../application/services/exchange-rate.service';

@Controller('rate')
export class ExchangeRateController {
  constructor(private readonly exchangeRateService: ExchangeRateService) {}

  @Get()
  async getExchangeRate(): Promise<GetExchangeRate> {
    return this.exchangeRateService.getExchangeRate();
  }

  /* @Post()
  @HttpCode(HttpStatus.CREATED)
  async createWeatherData(@Body() data: CreateWeatherDataDto) {
    await this.weatherService.createWeatherData(data);
  } */
}
