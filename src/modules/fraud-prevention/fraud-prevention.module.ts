import { Module } from '@nestjs/common';
import { FraudPreventionService } from './fraud-prevention.service';
import { FraudPreventionController } from './fraud-prevention.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FraudPrevention } from './entities/fraud.entity';
import { Dismissal } from './entities/dismissal.entity';
import { Suspicious } from './entities/suspicious.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FraudPrevention, Dismissal, Suspicious])],
  controllers: [FraudPreventionController],
  providers: [FraudPreventionService],
})
export class FraudPreventionModule {}
