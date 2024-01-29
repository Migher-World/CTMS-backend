import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto, UpdatePatientDto, UpdatePatientStatusDto } from './dto/patient.dto';
import { resolveResponse } from '../../shared/resolvers';
import { ICompany } from '../companies/interfaces/company.interface';
import { CurrentCompany } from '../../shared/decorators/current-company.decorator';
import { EnrollmentStatus } from './interfaces/patient.interface';
import { BasicPaginationDto } from '../../shared/dto/basic-pagination.dto';
import { Headers } from '../../shared/decorators/headers.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Patients')
@ApiBearerAuth()
@Headers()
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  create(@Body() createPatientDto: CreatePatientDto, @CurrentCompany() company: ICompany) {
    return resolveResponse(this.patientsService.create(createPatientDto, company));
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentCompany() company: ICompany) {
    return resolveResponse(this.patientsService.findOne(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto, @CurrentCompany() company: ICompany) {
    return resolveResponse(this.patientsService.update(id, updatePatientDto));
  }

  @Post('update-status')
  updatePatientStatus(@Body() payload: UpdatePatientStatusDto, @CurrentCompany() company: ICompany) {
    return resolveResponse(this.patientsService.updatePatientStatus(payload));
  }

  @Get()
  getPatientsByCompanyId(@Query() pagination: BasicPaginationDto, @CurrentCompany() company: ICompany) {
    return resolveResponse(
      this.patientsService.findAll(pagination, {
        where: {
          companyId: company.id,
        },
      }),
    );
  }
}
