import { Injectable } from '@nestjs/common';
import { BasicService } from '../../shared/services/basic-service.service';
import { Patient } from './entities/patient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PatientsService extends BasicService<Patient> {
  constructor(@InjectRepository(Patient) private readonly patientRepo: Repository<Patient>) {
    super(patientRepo, 'Patients');
  }
}
