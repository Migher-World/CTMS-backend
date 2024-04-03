import { PartialType } from '@nestjs/mapped-types';
import { CreateBudgetDto } from './create-budget.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateBudgetDto extends PartialType(CreateBudgetDto) {
    @IsOptional()
    siteFees: string;

    @IsOptional()
    totalBudget: string;

    @IsOptional()
    personnelFees: string;

    @IsOptional()
    equipmentAndSuppliesFees: string;

    @IsOptional()
    budgetDescription: string;

    @IsOptional()
    additionalInformation: string;

    @IsOptional()
    attachment:  Array<Express.Multer.File>;
}
