import { Permission } from './../../permissions/entities/permission.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { AbstractEntity } from '../../../shared/entities/abstract-entity';
import { Company } from '../../companies/entities/company.entity';

@Entity('roles')
export class Role extends AbstractEntity {
  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @Column()
  name: string;

  @Column('text')
  description: string;

  @ManyToMany(() => Permission, (permission) => permission.roles, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  permissions: Permission[];

  @Column()
  companyId: string;

  @ManyToOne(() => Company)
  @JoinColumn()
  company: Company;

  @Column({ default: false })
  requireTraining: boolean;
}
