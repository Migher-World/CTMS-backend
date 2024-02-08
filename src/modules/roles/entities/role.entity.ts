import { Permission } from './../../permissions/entities/permission.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { AbstractEntity } from '../../../shared/entities/abstract-entity';

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
  })
  @JoinTable()
  permissions: Permission[];

  @Column()
  companyId: string;

  @Column({ default: false })
  requireTraining: boolean;
}
