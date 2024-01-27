import { Body, Controller, Param, Post } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/patient.dto';
import { resolveResponse } from '../../shared/resolvers';
import { ICompany } from '../companies/interfaces/company.interface';
import { CurrentCompany } from '../../shared/decorators/current-company.decorator';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  create(@Body() createPatientDto: CreatePatientDto, @CurrentCompany() company: ICompany) {
    return resolveResponse(this.patientsService.create(createPatientDto, company));
  }

  @Post('update-status/:id')
  updatePatientStatus(@Body('status') status: string, @Param() id: string) {
    return resolveResponse(this.patientsService.updatePatientStatus(id, status));
  }
}
