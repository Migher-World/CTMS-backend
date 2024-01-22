import { IsNotEmpty, IsOptional } from 'class-validator';

export class AddUserDto {
  @IsNotEmpty()
  @IsOptional()
  fullName: string;

  @IsNotEmpty()
  @IsOptional()
  email: string;

  @IsNotEmpty()
  @IsOptional()
  phoneNumber: string;
}
