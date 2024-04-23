import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { resolveResponse } from 'src/shared/resolvers';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Headers } from '../../shared/decorators/headers.decorator';

@ApiTags('Budgets')
@ApiBearerAuth()
@Headers()
@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Post()
  create(@Body() createBudgetDto: CreateBudgetDto) {
    return resolveResponse(this.budgetsService.createBudget(createBudgetDto), 'Budget Created');
  }

  @Get()
  findAll() {
    return resolveResponse(this.budgetsService.findBudgets(), 'All Budgets gotten');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return resolveResponse(this.budgetsService.findBudget(id), 'Budget gotten');
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBudgetDto: UpdateBudgetDto) {
    return resolveResponse(this.budgetsService.updateBudget(id, updateBudgetDto), 'Budget Updated');
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return resolveResponse(this.budgetsService.deleteBudget(id), 'Budget Deleted');
  }
}
