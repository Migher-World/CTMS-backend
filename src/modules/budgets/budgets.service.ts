import { Injectable } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { BasicService } from 'src/shared/services/basic-service.service';
import { Budget } from './entities/budget.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BudgetsService extends BasicService<Budget> {
  constructor(@InjectRepository(Budget) private budgetRepo: Repository<Budget>) {
    super(budgetRepo, 'Budgets');
  }
  async create(createBudgetDto: CreateBudgetDto): Promise<Budget> {
    // let {trialName} = createBudgetDto
    const createBudget = this.budgetRepo.create({...createBudgetDto})
    const budget = await this.budgetRepo.save(createBudget);
    return budget;
  }

  async findBudgets(){
    const budgets = await this.budgetRepo.find()
    return budgets;
  }

  async findBudget(budgetId: string) {
    const id = budgetId
    const budget = await this.budgetRepo.findOne({where: {id}});
    return budget;
  }

  async updateBudget(budgetId: string, updateBudgetDto: UpdateBudgetDto) {
    const budget = await this.findBudget(budgetId);

    if (budget){
      Object.assign(budget, updateBudgetDto)
      //const updateBudget =  await this.budgetRepo.update(budgetId,updateBudgetDto);
      const updateBudget =  await this.budgetRepo.save(budget)
      return updateBudget
    }
  }

  async deleteBudget(budgetId: string) {
    const budget = await this.findBudget(budgetId);

    if (budget){
      await this.budgetRepo.delete(budgetId)
    }
  }
}
