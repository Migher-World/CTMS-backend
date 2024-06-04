import { PartialType } from "@nestjs/swagger";
import { CreateCompanyDto } from "./create-company.dto";
import { IsOptional } from "class-validator";

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
    @IsOptional()
    facilityInfra: string;

    @IsOptional()
    additionalInfo: string;

    @IsOptional()
    contactPerson: string;

    @IsOptional()
    contactPersonEmail: string;

    @IsOptional()
    contactPersonPhone: string;
}