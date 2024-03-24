import { PartialType } from '@nestjs/mapped-types';
import { CreateTrialDto } from './create-trial.dto';
import { IsArray, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { AgeGroup, BudgetCategory, ProtocolDetails, RecuitmentPlan, RegulatoryCompliance } from '../interfaces/trials.interface';
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
    @IsEnum(RecuitmentPlan)
    @IsOptional()
    @ApiProperty({enum: RecuitmentPlan})
    recruitmentPlan?: RecuitmentPlan;

    @IsNotEmpty()
    @IsOptional()
    @IsArray()
    inclusionCriteria?: string[];
    
    @IsNotEmpty()
    @IsOptional()
    @IsArray()
    exclusionCriteria?: string[];

}
