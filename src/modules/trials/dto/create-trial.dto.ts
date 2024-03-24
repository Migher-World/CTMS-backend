import { IsArray, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { AgeGroup, BudgetCategory, ProtocolDetails, RecruitmentPlan, RegulatoryCompliance } from "../interfaces/trials.interface";
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
    @IsOptional()
    siteName: string;

    @IsNotEmpty()
    @IsOptional()
    siteLocation: string;

    @IsNotEmpty()
    @IsOptional()
    siteInvestigator: string;

    @IsNotEmpty()
    @IsOptional()
    trackingNumber: string;

    @IsNotEmpty()
    allocatedAmount: string;

    @IsNotEmpty()
    @IsEnum(RegulatoryCompliance)
    @ApiProperty({enum: RegulatoryCompliance})
    regulatoryCompliance: RegulatoryCompliance;

    @IsNotEmpty()
    @IsEnum(RecruitmentPlan)
    @ApiProperty({enum: RecruitmentPlan})
    recruitmentPlan: RecruitmentPlan;

    @IsNotEmpty()
    @IsOptional()
    @IsArray()
    inclusionCriteria: string[];
    
    @IsNotEmpty()
    @IsOptional()
    @IsArray()
    exclusionCriteria: string[];

    @IsNotEmpty()
    irbSubmissionDate: string;
}
