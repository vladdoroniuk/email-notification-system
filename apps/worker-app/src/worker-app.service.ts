import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkerAppService {
  getHello(): string {
    return 'Hello World!';
  }
}
