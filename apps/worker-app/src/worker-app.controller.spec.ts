import { Test, TestingModule } from '@nestjs/testing';
import { WorkerAppController } from './worker-app.controller';
import { WorkerAppService } from './worker-app.service';

describe('WorkerAppController', () => {
  let workerAppController: WorkerAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WorkerAppController],
      providers: [WorkerAppService],
    }).compile();

    workerAppController = app.get<WorkerAppController>(WorkerAppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(workerAppController.getHello()).toBe('Hello World!');
    });
  });
});
