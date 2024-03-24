import { PartialType } from '@nestjs/mapped-types';
import { CreateTrialDto } from './create-trial.dto';
import { IsArray, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { AgeGroup, BudgetCategory, ProtocolDetails, RecruitmentPlan, RegulatoryCompliance } from '../interfaces/trials.interface';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTrialDto extends PartialType(CreateTrialDto) {
    @IsNotEmpty()
    @IsEnum(AgeGroup)
    @IsOptional()
    @ApiProperty({enum: AgeGroup})
    ageGroup?: AgeGroup;

    @IsNotEmpty()
    @IsEnum(BudgetCategory)
    @IsOptional()
    @ApiProperty({enum: BudgetCategory})
    budgetCategory?: BudgetCategory;

    @IsNotEmpty()
    @IsEnum(ProtocolDetails)
    @IsOptional()
    @ApiProperty({enum: ProtocolDetails})
    protocolDetails?: ProtocolDetails;

    @IsNotEmpty()
    @IsEnum(RegulatoryCompliance)
    @IsOptional()
    @ApiProperty({enum: RegulatoryCompliance})
    regulatoryCompliance?: RegulatoryCompliance;

    @IsNotEmpty()
    @IsEnum(RecruitmentPlan)
    @IsOptional()
    @ApiProperty({enum: RecruitmentPlan})
    recruitmentPlan?: RecruitmentPlan;

    @IsNotEmpty()
    @IsOptional()
    @IsArray()
    inclusionCriteria?: string[];
    
    @IsNotEmpty()
    @IsOptional()
    @IsArray()
    exclusionCriteria?: string[];

}
