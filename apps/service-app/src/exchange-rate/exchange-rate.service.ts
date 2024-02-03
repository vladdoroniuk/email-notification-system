import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NetworkService } from '../network-request/network-request.service';
import { GetExchangeRate } from './interfaces/exchange-rate.interface';
import { CreateNetworkRequest } from '../network-request/interfaces/network-request.interface';
import { COINMARKETCAP_API_URL, CURRENCIES } from 'libs/utils/consts';
import { extractExchangeRate } from 'libs/utils/array';

@Injectable()
export class ExchangeRateService {
  constructor(
    private readonly networkService: NetworkService,
    private readonly configService: ConfigService,
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
    const rate = extractExchangeRate(
      data,
      CURRENCIES.crypto.btc,
      CURRENCIES.fiat.uah,
    );

    return { rate };
  }
}
