import { PartialType } from '@nestjs/mapped-types';
import { CreateContractDto } from './create-contract.dto';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ContractStatus } from '../interfaces/contract.interface';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateContractDto extends PartialType(CreateContractDto) {
  @IsOptional()
  contractTitle: string;

  @IsOptional()
  effectiveDate: string;

  @IsOptional()
  expirationDate: string;

  @IsOptional()
  organization: string;

  @IsOptional()
  serviceProvider: string;

  @IsOptional()
  description: string;

  @IsOptional()
  paymentTerms: string;

  @IsOptional()
  terminationClause: string;

  @IsOptional()
  confidentiality: string;

  @IsOptional()
  insuranceRequirement: string;

  @IsOptional()
  contractValue: string;

  @IsOptional()
  paymentSchedule: string;

  @IsOptional()
  status: string;

  @IsOptional()
  @IsEnum(ContractStatus)
  @ApiProperty({ enum: ContractStatus })
  contractStatus: ContractStatus;
}
