import { PartialType } from '@nestjs/mapped-types';
import { CreateContractDto } from './create-contract.dto';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ContractStatus } from '../interfaces/contract.interface';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateContractDto extends PartialType(CreateContractDto) {
    @IsNotEmpty()
    contractTitle: string;

    @IsNotEmpty()
    effectiveDate: string;

    @IsNotEmpty()
    expirationDate: string;

    @IsNotEmpty()
    organization: string;

    @IsNotEmpty()
    serviceProvider: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    paymentTerms: string;

    @IsNotEmpty()
    terminationClause: string;

    @IsNotEmpty()
    confidentiality: string;

    @IsNotEmpty()
    insuranceRequirement: string;

    @IsNotEmpty()
    contractValue: string;

    @IsNotEmpty()
    @IsOptional()
    paymentSchedule: string;

    @IsOptional()
    status: string;

    @IsNotEmpty()
    @IsEnum(ContractStatus)
    @ApiProperty({enum: ContractStatus})
    contractStatus: ContractStatus;
}
