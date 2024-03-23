import { Module } from '@nestjs/common';
import { FraudPreventionService } from './fraud-prevention.service';
import { FraudPreventionController } from './fraud-prevention.controller';

@Module({
  controllers: [FraudPreventionController],
  providers: [FraudPreventionService]
})
export class FraudPreventionModule {}
