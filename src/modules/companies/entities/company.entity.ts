import { Column, Entity, OneToMany } from 'typeorm';
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

  @Column()
  address: string;

  @Column({ enum: CompanyType, type: 'enum' })
  type: CompanyType;

  @Column({ nullable: true })
  industry: string;

  @OneToMany(() => User, (user) => user.company)
  users: User[];

  @OneToMany(() => Trial, (trial) => trial.site)
  trials: Trial[];
}
