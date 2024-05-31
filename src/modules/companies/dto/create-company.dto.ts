import { IsEnum, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { CompanyType } from '../interfaces/company.interface';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Helper } from '../../../shared/helpers';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { Type } from 'class-transformer';

export class CreateCompanyDto {
  @IsNotEmpty()
  @ApiProperty({ example: Helper.faker.company.name() })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ example: Helper.faker.internet.email() })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: Helper.faker.phone.number('+234 91# ### ####') })
  phoneNumber: string;

  @IsNotEmpty()
  @ApiProperty({ example: Helper.faker.location.streetAddress() })
  address: string;

  @IsNotEmpty()
  @IsEnum(CompanyType)
  type: CompanyType;

  @IsOptional()
  @ApiPropertyOptional({ example: Helper.faker.company.buzzPhrase() })
  industry: string;

  @IsOptional()
  @ApiPropertyOptional({ description: 'only for sites' })
  siteType: string;
}


export class CreateCompanyWithUserDto {
  @IsNotEmpty()
  @ApiProperty({ example: Helper.faker.company.name() })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ example: Helper.faker.internet.email() })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: Helper.faker.phone.number('+234 91# ### ####') })
  phoneNumber: string;

  @IsNotEmpty()
  @ApiProperty({ example: Helper.faker.location.streetAddress() })
  address: string;

  @IsNotEmpty()
  @IsEnum(CompanyType)
  type: CompanyType;

  @IsOptional()
  @ApiPropertyOptional({ example: Helper.faker.company.buzzPhrase() })
  industry: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateUserDto)
  user: Omit<CreateUserDto, 'roleId' | 'password'>;
}

export class FilterCompanyDto {
  @IsOptional()
  @ApiPropertyOptional({ example: Helper.faker.company.buzzPhrase() })
  industry: string;

  @IsOptional()
  @IsEnum(CompanyType)
  type: CompanyType;

  @IsOptional()
  @ApiPropertyOptional({ example: "DESC" })
  sortBy: "DESC" | "ASC"

  // @IsOptional()
  // @ApiPropertyOptional({ example: Helper.faker.company.name() })
  // name: string;
}
