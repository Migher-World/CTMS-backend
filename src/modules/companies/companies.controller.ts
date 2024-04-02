import { Controller, Get, Query } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BasicPaginationDto } from '../../shared/dto/basic-pagination.dto';
import { FilterCompanyDto } from './dto/create-company.dto';
import { Headers } from '../../shared/decorators/headers.decorator';

@Controller('companies')
@ApiTags('Company')
@Headers()
@ApiBearerAuth()
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  async findAll(@Query() pagination: BasicPaginationDto, @Query() filter: FilterCompanyDto) {
    return await this.companiesService.findAll(pagination, filter);
  }
}
