import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { CreateNetworkRequest } from 'libs/contracts';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class NetworkService {
  constructor(private readonly httpService: HttpService) {}

  async createNetworkRequest(urlData: CreateNetworkRequest): Promise<any> {
    const { baseUrl, config } = urlData;

    return firstValueFrom(
      this.httpService.get(baseUrl, config).pipe(
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      ),
    );
  }
}
