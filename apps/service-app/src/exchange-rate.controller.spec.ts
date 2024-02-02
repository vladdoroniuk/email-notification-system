import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeRateController } from './exchange-rate.controller';
import { ExchangeRateService } from './exchange-rate.service';

describe('ExchangeRateController', () => {
  let exchangeRateController: ExchangeRateController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ExchangeRateController],
      providers: [ExchangeRateService],
    }).compile();

    exchangeRateController = app.get<ExchangeRateController>(ExchangeRateController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(exchangeRateController.getHello()).toBe('Hello World!');
    });
  });
});
