import { Injectable } from '@nestjs/common';
import { BasicService } from '../../shared/services/basic-service.service';
import { Patient } from './entities/patient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePatientDto } from './dto/patient.dto';
import { Helper } from '../../shared/helpers';
import { ICompany } from '../companies/interfaces/company.interface';
import { EnrollmentStatus } from './interfaces/patient.interface';

@Injectable()
export class PatientsService extends BasicService<Patient> {
  constructor(@InjectRepository(Patient) private readonly patientRepo: Repository<Patient>) {
    super(patientRepo, 'Patients');
  }

  async getPatientsByCompanyId(companyId: string): Promise<Patient[]> {
    return this.patientRepo.find({ where: { companyId } });
  }

  async create(payload: CreatePatientDto, company: ICompany): Promise<Patient> {
    const patientId = await this.generatePatientId(company);
    const patient = await this.patientRepo.create({
      ...payload,
      companyId: company.id,
      patientId,
    });
    await this.patientRepo.save(patient);
    return patient;
  }

  private async checkDuplicate(patientId: string, companyId: string): Promise<boolean> {
    const patient = await this.patientRepo.findOne({ where: { patientId, companyId } });
    if (patient) {
      return true;
    }
    return false;
  }

  private async generatePatientId(company: ICompany): Promise<string> {
    const patientId = Helper.generatePatientId(company.name);
    const isDuplicate = await this.checkDuplicate(patientId, company.id);
    if (isDuplicate) {
      return this.generatePatientId(company);
    }
    return patientId;
  }

  async updatePatientStatus(id: string, status: EnrollmentStatus): Promise<Patient> {
    const patient = await this.findOne(id);
    patient.enrollmentStatus = status;
    await patient.save();
    return patient;
  }
}
