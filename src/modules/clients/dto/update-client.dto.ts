import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Category, ClientType } from '../interfaces/clients.interface';

export class UpdateClientDto extends PartialType(CreateClientDto) {
    @IsOptional()
    name: string;
  
    @IsOptional()
    clientEmail: string;
  
    @IsOptional()
    contactPerson: string;
  
    @IsEnum(Category)
    category: Category;
  
    @IsEnum(ClientType)
    clientType: ClientType; 
}
