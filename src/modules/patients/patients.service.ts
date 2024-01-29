import { Injectable } from '@nestjs/common';
import { BasicService } from '../../shared/services/basic-service.service';
import { Patient } from './entities/patient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePatientDto, UpdatePatientDto, UpdatePatientStatusDto } from './dto/patient.dto';
import { Helper } from '../../shared/helpers';
import { ICompany } from '../companies/interfaces/company.interface';
import { EnrollmentStatus } from './interfaces/patient.interface';

@Injectable()
export class PatientsService extends BasicService<Patient> {
  constructor(@InjectRepository(Patient) private readonly patientRepo: Repository<Patient>) {
    super(patientRepo, 'Patients');
  }

  async create(payload: CreatePatientDto, company: ICompany): Promise<Patient> {
    const patientId = await this.generatePatientId(company);
    const patient = await this.patientRepo.create({
      ...payload,
      companyId: company.id,
      patientId,
      enrollmentDate: new Date().toISOString(),
    });
    await this.patientRepo.save(patient);
    return patient;
  }

  async update(id: string, payload: UpdatePatientDto): Promise<Patient> {
    const patient = await this.findOne(id);
    await this.patientRepo.save({ ...patient, ...payload });
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

  async updatePatientStatus(payload: UpdatePatientStatusDto): Promise<Patient> {
    const patient = await this.findOne(payload.patientId);
    patient.enrollmentStatus = payload.status;
    await patient.save();
    return patient;
  }
}
