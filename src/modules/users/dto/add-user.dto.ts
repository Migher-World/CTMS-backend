import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { CreateClientDto } from 'src/modules/clients/dto/create-client.dto';

export class AddUserDto {
  @IsNotEmpty()
  @ValidateNested({ always: true })
  @Type(() => CreateUserDto)
  user: CreateUserDto;

  @IsNotEmpty()
  @IsOptional()
  @Type(() => CreateClientDto)
  client: CreateClientDto
}
