import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateNetworkRequest } from './interfaces/network-request.interface';

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
