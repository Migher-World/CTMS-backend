import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../../shared/entities/abstract-entity';
import { CompanyCategory, ICompany } from '../interfaces/company.interface';

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

  @Column({ enum: CompanyCategory, type: 'enum' })
  type: CompanyCategory;

  @Column({ nullable: true })
  industry: string;
}
