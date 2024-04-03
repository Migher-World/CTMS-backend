import { Test, TestingModule } from '@nestjs/testing';
import { FraudPreventionController } from './fraud-prevention.controller';
import { FraudPreventionService } from './fraud-prevention.service';

describe('FraudPreventionController', () => {
  let controller: FraudPreventionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FraudPreventionController],
      providers: [FraudPreventionService],
    }).compile();

    controller = module.get<FraudPreventionController>(FraudPreventionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
