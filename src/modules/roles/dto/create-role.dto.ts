import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  permissionsId: string[];

  @IsOptional()
  requireTraining: boolean;
}
