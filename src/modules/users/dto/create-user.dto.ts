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

  @IsNotEmpty()
  @IsOptional()
  phoneNumber: string;

  @IsOptional()
  password: string;

  @IsNotEmpty()
  @IsOptional()
  @Type(() => CreateClientDto)
  client: CreateClientDto
}

export enum PreferredCommunication {
  WHATSAPP = 'WhatsApp',
  SMS = 'SMS',
  EMAIL = 'Email',
}
