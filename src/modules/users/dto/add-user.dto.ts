import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { CreateClientDto } from 'src/modules/clients/dto/create-client.dto';
import { CompanyType } from '../../companies/interfaces/company.interface';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class AddUserDto {
  @IsNotEmpty()
  @ValidateNested({ always: true })
  @Type(() => CreateUserDto)
  user: CreateUserDto;

  @IsNotEmpty()
  @IsOptional()
  @Type(() => CreateClientDto)
  client: CreateClientDto;
}

export class FilterUserDto {
  @IsOptional()
  @ApiPropertyOptional()
  search: string;

  @IsOptional()
  @ApiPropertyOptional()
  companyType: CompanyType;

  @IsOptional()
  @ApiPropertyOptional()
  companyId: string;
}
