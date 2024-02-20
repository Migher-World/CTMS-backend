import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { Currency } from "../interfaces/budgets.interface";

export class CreateBudgetDto {
    @IsNotEmpty()
    trialName: string;

    @IsNotEmpty()
    @IsEnum(Currency)
    currency: Currency;

    @IsNotEmpty()
    totalBudget: string;

    @IsNotEmpty()
    startDate: string;

    @IsNotEmpty()
    endDate: string;

    @IsNotEmpty()
    @IsOptional()
    siteFees: string;

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
    attachment: [];
}
