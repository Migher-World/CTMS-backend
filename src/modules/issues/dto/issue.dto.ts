import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Helper } from '../../../shared/helpers';
import { IssueStatus } from '../entities/issues.entity';

export class CreateIssueDto {
  @IsNotEmpty()
  @ApiProperty({ type: String, description: Helper.faker.lorem.words() })
  title: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: Helper.faker.lorem.sentence() })
  description: string;

  @IsNotEmpty()
  @IsEnum(IssueStatus)
  status: IssueStatus;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: Helper.faker.string.uuid() })
  assignedToId: string;

  @IsOptional()
  @ApiPropertyOptional({ type: String, description: Helper.faker.image.url() })
  attachment: string;
}

export class UpdateIssueDto extends CreateIssueDto {}

export class FilterIssueDto {
  @IsOptional()
  @IsEnum(IssueStatus)
  status: IssueStatus;

  @IsOptional()
  @ApiPropertyOptional({ type: String, description: Helper.faker.string.uuid() })
  assignedToId: string;

  @IsOptional()
  @ApiPropertyOptional({ type: String, description: Helper.faker.string.uuid() })
  authorId: string;
}
