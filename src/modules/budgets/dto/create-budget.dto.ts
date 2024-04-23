import { IsDateString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Currency } from '../interfaces/budgets.interface';

export class CreateBudgetDto {
  @IsNotEmpty()
  trialId: string;

  @IsNotEmpty()
  @IsEnum(Currency)
  currency: Currency;

  @IsNotEmpty()
  totalBudget: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @IsNotEmpty()
  siteFees: string;

  @IsNotEmpty()
  personnelFees: string;

  @IsNotEmpty()
  equipmentAndSuppliesFees: string;

  @IsNotEmpty()
  budgetDescription: string;

  @IsOptional()
  additionalInformation: string;
}
