import { Controller, Get } from '@nestjs/common';
import { WorkerAppService } from './worker-app.service';

@Controller()
export class WorkerAppController {
  constructor(private readonly workerAppService: WorkerAppService) {}

  @Get()
  getHello(): string {
    return this.workerAppService.getHello();
  }
}
