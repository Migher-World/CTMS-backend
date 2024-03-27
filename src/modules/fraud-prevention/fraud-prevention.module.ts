import { Module } from '@nestjs/common';
import { FraudPreventionService } from './fraud-prevention.service';
import { FraudPreventionController } from './fraud-prevention.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FraudPrevention } from './entities/fraud.entity';
import { Dismissal } from './entities/dismissal.entity';
import { Suspicious } from './entities/suspicious.entity';
import { Trial } from '../trials/entities/trial.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FraudPrevention, Dismissal, Suspicious, Trial])
  ],
  controllers: [FraudPreventionController],
  providers: [FraudPreventionService]
})
export class FraudPreventionModule {}
