import { PartialType } from '@nestjs/mapped-types';
import { CreateTrialDto } from './create-trial.dto';
import { IsArray, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { AgeGroup, BudgetCategory, ProtocolDetails, RecuitmentPlan, RegulatoryCompliance } from '../interfaces/trials.interface';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTrialDto extends PartialType(CreateTrialDto) {
    @IsNotEmpty()
    @IsEnum(AgeGroup)
    @ApiProperty({enum: AgeGroup})
    ageGroup?: AgeGroup;

    @IsNotEmpty()
    @IsEnum(BudgetCategory)
    @ApiProperty({enum: BudgetCategory})
    budgetCategory?: BudgetCategory;

    @IsNotEmpty()
    @IsEnum(ProtocolDetails)
    @ApiProperty({enum: ProtocolDetails})
    protocolDetails?: ProtocolDetails;

    @IsNotEmpty()
    @IsEnum(RegulatoryCompliance)
    @ApiProperty({enum: RegulatoryCompliance})
    regulatoryCompliance?: RegulatoryCompliance;

    @IsNotEmpty()
    @IsEnum(RecuitmentPlan)
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
