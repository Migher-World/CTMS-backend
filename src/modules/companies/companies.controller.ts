import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BasicPaginationDto } from '../../shared/dto/basic-pagination.dto';
import { CreateCompanyDto, FilterCompanyDto } from './dto/create-company.dto';
import { Headers } from '../../shared/decorators/headers.decorator';
import { resolveResponse } from '../../shared/resolvers';

@Controller('companies')
@ApiTags('Company')
@Headers()
@ApiBearerAuth()
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  async findAll(@Query() pagination: BasicPaginationDto, @Query() filter: FilterCompanyDto) {
    return resolveResponse(this.companiesService.findAll(pagination, filter));
  }

  @Post()
  async createCompany(@Body() data: CreateCompanyDto) {
    return resolveResponse(this.companiesService.create(data));
  }
}
