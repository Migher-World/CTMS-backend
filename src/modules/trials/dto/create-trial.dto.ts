import { IsArray, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import {
  AgeGroup,
  BudgetCategory,
  ProtocolDetails,
  RecruitmentPlan,
  RegulatoryCompliance,
  TrialPermissions,
} from '../interfaces/trials.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrialDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  startDate: string;

  @IsNotEmpty()
  endDate: string;

  @IsNotEmpty()
  @IsEnum(ProtocolDetails)
  @ApiProperty({ enum: ProtocolDetails })
  protocolDetails: ProtocolDetails;

  @IsNotEmpty()
  objectives: string;

  @IsOptional()
  @IsUUID()
  vendorId: string;

  @IsOptional()
  @IsUUID()
  sponsorId: string;

  @IsOptional()
  siteIds: string[];

  @IsNotEmpty()
  @ApiProperty({ example: 'male' })
  gender: 'male' | 'female';

  @IsNotEmpty()
  @IsEnum(AgeGroup)
  @ApiProperty({ enum: AgeGroup })
  ageGroup: AgeGroup;

  @IsNotEmpty()
  @IsEnum(BudgetCategory)
  @ApiProperty({ enum: BudgetCategory })
  budgetCategory: BudgetCategory;

  @IsNotEmpty()
  allocatedAmount: string;

  @IsNotEmpty()
  @IsEnum(RegulatoryCompliance)
  @ApiProperty({ enum: RegulatoryCompliance })
  regulatoryCompliance: RegulatoryCompliance;

  @IsNotEmpty()
  @IsEnum(RecruitmentPlan)
  @ApiProperty({ enum: RecruitmentPlan })
  recruitmentPlan: RecruitmentPlan;

  @IsNotEmpty()
  @IsArray()
  inclusionCriteria: string[];

  @IsNotEmpty()
  @IsArray()
  exclusionCriteria: string[];

  @IsNotEmpty()
  @IsDateString()
  irbSubmissionDate: string;

  @IsOptional()
  irbApprovalDocument: string;

  @IsOptional()
  companyId: string;
}

export class TrialPermissionDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsArray()
  permissions: TrialPermissions[];
}
