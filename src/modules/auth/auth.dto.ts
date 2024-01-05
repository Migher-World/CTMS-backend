import { IsEmail, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { CreateCompanyDto } from '../companies/dto/create-company.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Helper } from '../../shared/helpers';
import { Type } from 'class-transformer';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: Helper.faker.internet.email() })
  email: string;

  @IsNotEmpty()
  password: string;
}

export class RegisterDto {
  @IsNotEmpty()
  @ApiProperty({ example: Helper.faker.person.firstName() })
  firstName: string;

  @IsNotEmpty()
  @ApiProperty({ example: Helper.faker.person.lastName() })
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: Helper.faker.internet.email() })
  email: string;

  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({ example: Helper.faker.phone.number('+234 91# ### ####') })
  phoneNumber: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @ValidateNested({ always: true })
  @Type(() => CreateCompanyDto)
  company: CreateCompanyDto;
}

export interface AuthPayload {
  id: string;
}
