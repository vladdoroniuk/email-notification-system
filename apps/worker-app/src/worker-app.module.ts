import { Module } from '@nestjs/common';
import { WorkerAppController } from './worker-app.controller';
import { WorkerAppService } from './worker-app.service';

@Module({
  imports: [],
  controllers: [WorkerAppController],
  providers: [WorkerAppService],
})
export class WorkerAppModule {}
