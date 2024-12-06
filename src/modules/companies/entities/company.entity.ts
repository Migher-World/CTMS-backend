import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../shared/entities/abstract-entity';
import { CompanyType, ICompany } from '../interfaces/company.interface';
import { User } from '../../users/entities/user.entity';
import { Trial } from '../../trials/entities/trial.entity';

@Entity('companies')
export class Company extends AbstractEntity implements ICompany {
  @Column()
  name: string;

  @Column({ default: true })
  status: boolean;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column({ nullable: true })
  siteType: string;

  @Column()
  address: string;

  @Column()
  type: CompanyType;

  @Column('simple-array', { nullable: true })
  facilityInfra: string[];

  @Column({ nullable: true })
  additionalInfo: string;

  @Column({ nullable: true })
  contactPerson: string;

  @Column({ nullable: true })
  contactPersonEmail: string;

  @Column({ nullable: true })
  contactPersonPhone: string;

  @Column({ nullable: true })
  principalInvestigator: string;

  @Column({ nullable: true })
  industry: string;

  @Column({ nullable: true })
  siteOverview: string;

  @OneToMany(() => User, (user) => user.company)
  users: User[];

  @ManyToMany(() => Trial, (trial) => trial.sites)
  trials: Trial[];

  @OneToMany(() => Trial, (trial) => trial.vendor)
  vendorTrial: Trial[];

  @OneToMany(() => Trial, (trial) => trial.sponsor)
  sponsorTrial: Trial[];
}
