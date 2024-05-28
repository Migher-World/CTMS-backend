import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import {
  AgeGroup,
  BudgetCategory,
  ITrial,
  ProtocolDetails,
  RecruitmentPlan,
  RegulatoryCompliance,
} from '../interfaces/trials.interface';
import { User } from '../../users/entities/user.entity';
import { AbstractEntity } from '../../../shared/entities/abstract-entity';
import { Company } from '../../companies/entities/company.entity';
import { Contract } from '../../contract/entities/contract.entity';
import { Budget } from '../../budgets/entities/budget.entity';
import { TrialPermission } from './trial-permission.entity';

@Entity('trials')
export class Trial extends AbstractEntity implements ITrial {
  @Column()
  name: string;

  @OneToMany(() => Budget, (budget) => budget.trial)
  budgets: Budget[];

  @OneToMany(() => Contract, (contract) => contract.trial)
  contracts: Contract[];

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column({ enum: ProtocolDetails, type: 'enum' })
  protocolDetails: ProtocolDetails;

  @Column()
  objectives: string;

  @Column()
  companyId: string;

  @ManyToOne(() => Company)
  @JoinColumn()
  company: Company;

  @ManyToMany(() => Company, (company) => company.trials, { eager: true })
  @JoinTable()
  sites: Company[];

  @Column({ nullable: true })
  vendorId: string;

  @ManyToOne(() => Company, { eager: true })
  @JoinColumn()
  vendor: Company;

  @Column({ nullable: true })
  sponsorId: string;

  @Column({ nullable: true })
  therapeuticArea: string;

  @Column({ nullable: true })
  typesOfParticipants: string;

  @Column({ nullable: true })
  typeOfStudy: string;

  @ManyToOne(() => Company, { eager: true })
  @JoinColumn()
  sponsor: Company;

  @Column()
  gender: 'male' | 'female';

  @Column({ enum: AgeGroup, type: 'enum' })
  ageGroup: AgeGroup;

  @Column({ enum: BudgetCategory, type: 'enum' })
  budgetCategory: BudgetCategory;

  @Column()
  allocatedAmount: string;

  // @Column({ enum: RegulatoryCompliance, type: 'enum' })
  @Column()
  regulatoryCompliance: RegulatoryCompliance;

  @Column({ enum: RecruitmentPlan, type: 'enum' })
  recruitmentPlan: RecruitmentPlan;

  @Column('simple-array')
  inclusionCriteria: string[];

  @Column('simple-array')
  exclusionCriteria: string[];

  @Column()
  irbSubmissionDate: string;

  @Column()
  trackingNumber: string;

  @Column({ nullable: true })
  irbApprovalDocument: string;

  @Column()
  createdById: string;

  @ManyToOne(() => User)
  @JoinColumn()
  createdBy: User;
}
