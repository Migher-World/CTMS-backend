import { IsEmail, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { CreateCompanyDto } from '../companies/dto/create-company.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Helper } from '../../shared/helpers';
import { Type } from 'class-transformer';

export class RequestResetPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: Helper.faker.internet.email() })
  email: string;
}

export class SetPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: Helper.faker.internet.email() })
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  code: string;
}

export class ResetPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: Helper.faker.internet.email() })
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  otp: string;
}

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

  @IsOptional()
  setPassword: boolean;
}

export interface AuthPayload {
  id: string;
}
