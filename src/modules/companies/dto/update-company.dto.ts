import { PartialType } from '@nestjs/swagger';
import { CreateCompanyDto } from './create-company.dto';
import { IsArray, IsOptional } from 'class-validator';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
  @IsOptional()
  @IsArray()
  facilityInfra: string[];

  @IsOptional()
  additionalInfo: string;

  @IsOptional()
  contactPerson: string;

  @IsOptional()
  contactPersonEmail: string;

  @IsOptional()
  contactPersonPhone: string;

  @IsOptional()
  principalInvestigator: string;

  @IsOptional()
  siteOverview: string;
}
