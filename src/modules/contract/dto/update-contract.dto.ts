import { PartialType } from '@nestjs/mapped-types';
import { CreateContractDto } from './create-contract.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

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
}
