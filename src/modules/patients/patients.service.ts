import { Injectable } from '@nestjs/common';
import { BasicService } from '../../shared/services/basic-service.service';
import { Patient } from './entities/patient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePatientDto, UpdatePatientDto, UpdatePatientStatusDto } from './dto/patient.dto';
import { Helper } from '../../shared/helpers';
import { ICompany } from '../companies/interfaces/company.interface';
import { EnrollmentStatus } from './interfaces/patient.interface';
import { BasicPaginationDto } from '../../shared/dto/basic-pagination.dto';

@Injectable()
export class PatientsService extends BasicService<Patient> {
  constructor(@InjectRepository(Patient) private readonly patientRepo: Repository<Patient>) {
    super(patientRepo, 'Patients');
  }

  async create(payload: CreatePatientDto, company: ICompany): Promise<Patient> {
    if(!company && !payload.companyId) {
      throw new Error('Company is required to create a patient as a super admin');
    }
    const patientId = await this.generatePatientId(company);
    const patient = await this.patientRepo.create({
      ...payload,
      companyId: company?.id ?? payload.companyId,
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

  async findAll(pagination: BasicPaginationDto, company: ICompany) {
    const query = this.patientRepo.createQueryBuilder('patient');
    if (company) {
      query.where('patient.companyId = :companyId', { companyId: company.id });
    }
    return this.paginate(query, pagination);
  }

  async getPatientOverview(companyId: string) {
    const patients = await this.patientRepo.find({ where: { companyId } });

    const enrollmentStatusCounts = {
      [EnrollmentStatus.ENROLLED.replace(/\s/g, '')]: 0,
      [EnrollmentStatus.WITHDRAWN.replace(/\s/g, '')]: 0,
      [EnrollmentStatus.COMPLETED.replace(/\s/g, '')]: 0,
      [EnrollmentStatus.ON_HOLD.replace(/\s/g, '')]: 0,
      [EnrollmentStatus.SCREENING_IN_PROGRESS.replace(/\s/g, '')]: 0,
      [EnrollmentStatus.SCREENING_FAILED.replace(/\s/g, '')]: 0,
      [EnrollmentStatus.INACTIVE.replace(/\s/g, '')]: 0,
      [EnrollmentStatus.PENDING_CONSENT.replace(/\s/g, '')]: 0,
      [EnrollmentStatus.PENDING_SCREENING_RESULTS.replace(/\s/g, '')]: 0,
    };

    patients.forEach((patient) => {
      const status = patient.enrollmentStatus as EnrollmentStatus;
      enrollmentStatusCounts[status]++;
    });

    return enrollmentStatusCounts;
  }
}
