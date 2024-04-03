import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Category, ClientType } from '../interfaces/clients.interface';

export class CreateClientDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  clientEmail: string;

  @IsNotEmpty()
  contactPerson: string;

  @IsNotEmpty()
  @IsEnum(Category)
  category: Category;

  @IsNotEmpty()
  @IsEnum(ClientType)
  clientType: ClientType; 
}
