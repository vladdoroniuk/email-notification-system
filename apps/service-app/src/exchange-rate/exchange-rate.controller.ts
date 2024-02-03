import { Controller, Get } from '@nestjs/common';
import { ExchangeRateService } from './exchange-rate.service';
import { GetExchangeRate } from './interfaces/get-exchange-rate.interface';

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
