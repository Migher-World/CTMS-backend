import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BasicPaginationDto } from '../../shared/dto/basic-pagination.dto';
import { CreateCompanyDto, CreateCompanyWithUserDto, FilterCompanyDto } from './dto/create-company.dto';
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

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return resolveResponse(this.companiesService.findOne(id));
  }

  @Get('get/list')
  async listAll(@Query() filter: FilterCompanyDto) {
    return resolveResponse(this.companiesService.listAll(filter));
  }

  @Patch(':id')
  async updateCompany(@Param('id') id: string, @Body() data: CreateCompanyDto) {
    return resolveResponse(this.companiesService.updateCompany(id, data));
  }

  @Post()
  async createCompany(@Body() data: CreateCompanyWithUserDto) {
    return resolveResponse(this.companiesService.createCompany(data));
  }
}
