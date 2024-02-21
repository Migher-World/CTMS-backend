import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateContractDto {
    @IsNotEmpty()
    trialName: string;

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
    paymentSchedule: string;

    @IsOptional()
    attachments: Array<Express.Multer.File>;
}
