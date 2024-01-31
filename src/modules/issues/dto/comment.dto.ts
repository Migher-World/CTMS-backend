import { IsNotEmpty } from 'class-validator';
import { Helper } from '../../../shared/helpers';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @IsNotEmpty()
  @ApiProperty({ type: String, description: Helper.faker.lorem.words() })
  content: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: Helper.faker.string.uuid() })
  issueId: string;
}
