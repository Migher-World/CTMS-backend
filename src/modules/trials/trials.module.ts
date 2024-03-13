import { Module } from '@nestjs/common';
import { TrialsService } from './trials.service';
import { TrialsController } from './trials.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trial } from './entities/trial.entity';
import { CompaniesModule } from '../companies/companies.module';

@Module({
  imports: [TypeOrmModule.forFeature([Trial]), CompaniesModule],
  controllers: [TrialsController],
  providers: [TrialsService],
  exports: [TypeOrmModule]
})
export class TrialsModule {}
