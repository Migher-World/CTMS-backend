import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { AgeGroup, BudgetCategory, ProtocolDetails, RecuitmentPlan, RegulatoryCompliance } from "../interfaces/trials.interface";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTrialDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    startDate: string;

    @IsNotEmpty()
    endDate: string;

    @IsNotEmpty()
    @IsEnum(ProtocolDetails)
    @ApiProperty({enum: ProtocolDetails})
    protocolDetails: ProtocolDetails;

    @IsNotEmpty()
    objectives: string;

    @IsNotEmpty()
    @ApiProperty({ example: 'male' })
    gender: 'male' | 'female';

    @IsNotEmpty()
    @IsEnum(AgeGroup)
    @ApiProperty({enum: AgeGroup})
    ageGroup: AgeGroup;

    @IsNotEmpty()
    @IsEnum(BudgetCategory)
    @ApiProperty({enum: BudgetCategory})
    budgetCategory: BudgetCategory;

    @IsNotEmpty()
    allocatedAmount: string;

    @IsNotEmpty()
    @IsEnum(RegulatoryCompliance)
    @ApiProperty({enum: RegulatoryCompliance})
    regulatoryCompliance: RegulatoryCompliance;

    @IsNotEmpty()
    @IsEnum(RecuitmentPlan)
    @ApiProperty({enum: RecuitmentPlan})
    recruitmentPlan: RecuitmentPlan;

    @IsNotEmpty()
    @IsOptional()
    inclusionCriteria: string;
    
    @IsNotEmpty()
    @IsOptional()
    exclusionCriteria: string;

    @IsNotEmpty()
    irbSubmissionDate: string;
}