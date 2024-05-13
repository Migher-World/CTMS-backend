import { Module } from '@nestjs/common';
import { TrialsService } from './trials.service';
import { TrialsController } from './trials.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trial } from './entities/trial.entity';
import { Company } from '../companies/entities/company.entity';
import { TrialPermission } from './entities/trial-permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trial, TrialPermission])],
  controllers: [TrialsController],
  providers: [TrialsService],
})
export class TrialsModule {}
