import { Test, TestingModule } from '@nestjs/testing';
import { FraudPreventionService } from './fraud-prevention.service';

describe('FraudPreventionService', () => {
  let service: FraudPreventionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FraudPreventionService],
    }).compile();

    service = module.get<FraudPreventionService>(FraudPreventionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
