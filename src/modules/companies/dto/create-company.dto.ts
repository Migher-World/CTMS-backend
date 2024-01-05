import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { CompanyCategory } from '../interfaces/company.interface';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Helper } from '../../../shared/helpers';

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
  @IsEnum(CompanyCategory)
  type: CompanyCategory;

  @IsOptional()
@ApiPropertyOptional({ example: Helper.faker.company.bs() })
  industry: string;
}
