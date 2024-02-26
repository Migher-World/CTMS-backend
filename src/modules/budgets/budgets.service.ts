import { Injectable } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { BasicService } from 'src/shared/services/basic-service.service';
import { Budget } from './entities/budget.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cloudinary } from 'src/shared/plugins/cloud-storage/cloudinary';

@Injectable()
export class BudgetsService extends BasicService<Budget> {
  constructor(
    @InjectRepository(Budget) 
    private budgetRepo: Repository<Budget>,
    private cloudinary: Cloudinary) {
    super(budgetRepo, 'Budgets');
  }
  async createBudget(createBudgetDto: CreateBudgetDto, attachments: Express.Multer.File): Promise<Budget> {
    console.log(attachments)
    const fileUrl = attachments.path;
    console.log(fileUrl)
    const uploadedAttachments = await this.cloudinary.uploadFile(fileUrl)
    console.log(uploadedAttachments)
    // const uploadedAttachments = await Promise.all(
    //   attachments.map(async(attachment) =>{
    //     const {path} = attachment.originalname
    //     const uploadedFile = await this.cloudinary.uploadFile(path);
    //     console.log(uploadedFile)
    //     return uploadedFile
    //   })
    // )
    const createBudget = this.budgetRepo.create({ ...createBudgetDto,  attachments: uploadedAttachments });
    const budget = await this.budgetRepo.save(createBudget);
    return budget;
  }

  async findBudgets(): Promise<Budget[]> {
    const budgets = await this.budgetRepo.find();
    return budgets;
  }

  async findBudget(budgetId: string): Promise<Budget> {
    const id = budgetId;
    const budget = await this.budgetRepo.findOne({ where: { id } });
    return budget;
  }

  async updateBudget(budgetId: string, updateBudgetDto: UpdateBudgetDto): Promise<Budget> {
    const budget = await this.findBudget(budgetId);

    if (budget) {
      Object.assign(budget, updateBudgetDto);
      //const updateBudget =  await this.budgetRepo.update(budgetId,updateBudgetDto);
      const updateBudget = await this.budgetRepo.save(budget);
      return updateBudget;
    }
  }

  async deleteBudget(budgetId: string) {
    const budget = await this.findBudget(budgetId);

    if (budget) {
      await this.budgetRepo.delete(budgetId);
    }
  }
}
