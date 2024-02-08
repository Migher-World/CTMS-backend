import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreateRoleDto } from './create-role.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
}

export class AddPermissionsToRoleDto {
  @IsNotEmpty()
  roleId: string;

  @IsNotEmpty()
  permissionsId: string[];
}
