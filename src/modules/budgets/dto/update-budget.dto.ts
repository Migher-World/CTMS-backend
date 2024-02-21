import { PartialType } from '@nestjs/mapped-types';
import { CreateBudgetDto } from './create-budget.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateBudgetDto extends PartialType(CreateBudgetDto) {
    @IsNotEmpty()
    @IsOptional()
    siteFees: string;

    @IsNotEmpty()
    @IsOptional()
    totalBudget: string;

    @IsNotEmpty()
    @IsOptional()
    personnelFees: string;

    @IsNotEmpty()
    @IsOptional()
    equipmentAndSuppliesFees: string;

    @IsNotEmpty()
    @IsOptional()
    budgetDescription: string;

    @IsOptional()
    additionalInformation: string;

    @IsOptional()
    attachment:  Array<Express.Multer.File>;
}
