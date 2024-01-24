import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Category, ClientType } from '../interfaces/clients.interface';

export class UpdateClientDto extends PartialType(CreateClientDto) {
    @IsNotEmpty()
    @IsOptional()
    name: string;
  
    @IsNotEmpty()
    @IsOptional()
    clientEmail: string;
  
    @IsNotEmpty()
    @IsOptional()
    contactPerson: string;
  
    @IsNotEmpty()
    @IsEnum(Category)
    category: Category;
  
    @IsNotEmpty()
    @IsEnum(ClientType)
    clientType: ClientType; 
}
