import { Module } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { BudgetsController } from './budgets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Budget } from './entities/budget.entity';
import { Cloudinary } from 'src/shared/plugins/cloud-storage/cloudinary';

@Module({
  imports: [TypeOrmModule.forFeature([Budget])],
  controllers: [BudgetsController],
  providers: [BudgetsService, Cloudinary]
})
export class BudgetsModule {}
