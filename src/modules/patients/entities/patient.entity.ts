import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../shared/entities/abstract-entity';
import { EnrollmentStatus, IPatient } from '../interfaces/patient.interface';
import { Company } from '../../companies/entities/company.entity';

@Entity('patients')
export class Patient extends AbstractEntity implements IPatient {
  @Column()
  patientId: string;

  @Column({ type: 'timestamp' })
  enrollmentDate: string;

  @Column({ type: 'enum', enum: EnrollmentStatus })
  enrollmentStatus: EnrollmentStatus;

  @Column()
  birthDate: string;

  @Column()
  gender: 'male' | 'female';

  @Column()
  nationality: string;

  @Column()
  consentReceived: boolean;

  @Column()
  commencedTreatment: boolean;

  @Column()
  droppedOut: boolean;

  @Column()
  visitCompleted: boolean;

  @Column({default: 'patient'})
  participantType: string;

  @Column()
  withinWindow: boolean;

  @Column()
  companyId: string;

  @ManyToOne(() => Company, { eager: true })
  company: Company;
}
