import { PartialType } from '@nestjs/mapped-types';
import { CreateTrialDto } from './create-trial.dto';
import { IsArray, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import {
  AgeGroup,
  BudgetCategory,
  ProtocolDetails,
  RecruitmentPlan,
  RegulatoryCompliance,
} from '../interfaces/trials.interface';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTrialDto extends PartialType(CreateTrialDto) {
  @IsEnum(AgeGroup)
  @IsOptional()
  @ApiProperty({ enum: AgeGroup })
  ageGroup?: AgeGroup;

  @IsEnum(BudgetCategory)
  @IsOptional()
  @ApiProperty({ enum: BudgetCategory })
  budgetCategory?: BudgetCategory;

  @IsEnum(ProtocolDetails)
  @IsOptional()
  @ApiProperty({ enum: ProtocolDetails })
  protocolDetails?: ProtocolDetails;

  // @IsEnum(RegulatoryCompliance)
  @IsOptional()
  // @ApiProperty({ enum: RegulatoryCompliance })
  // regulatoryCompliance?: RegulatoryCompliance;
  regulatoryCompliance?: RegulatoryCompliance;

  @IsEnum(RecruitmentPlan)
  @IsOptional()
  @ApiProperty({ enum: RecruitmentPlan })
  recruitmentPlan?: RecruitmentPlan;

  @IsOptional()
  @IsArray()
  inclusionCriteria?: string[];

  // @IsOptional()
  // @IsArray()
  // exclusionCriteria?: string[];
}
