import { Exclude, Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateClientDto } from 'src/modules/clients/dto/create-client.dto';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  phoneNumber: string;

  @IsOptional()
  password: string;

  @IsNotEmpty()
  roleId: string;

  @IsOptional()
  @Type(() => CreateClientDto)
  client: CreateClientDto

  @IsOptional()
  setPassword: boolean;
}

export enum PreferredCommunication {
  WHATSAPP = 'WhatsApp',
  SMS = 'SMS',
  EMAIL = 'Email',
}
