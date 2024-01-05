import { AfterLoad, BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { instanceToPlain, Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { AbstractEntity } from '../../../shared/entities/abstract-entity';
import { Company } from '../../companies/entities/company.entity';
import { IUser } from '../interfaces/user.interface';

@Entity('users')
export class User extends AbstractEntity implements IUser {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true, unique: true })
  phoneNumber: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  companyId: string;

  @ManyToOne(() => Company, { eager: true })
  @JoinColumn()
  company: Company;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn()
  role: Role;

  @Column({ nullable: true })
  roleId: string;

  @Column({ default: true })
  status: boolean;

  @Column({ default: false })
  emailVerified: boolean;

  @Column({ default: false })
  phoneNumberVerified: boolean;

  fullName: string;
  verified: boolean;

  @BeforeInsert()
  async handleBeforeInsert() {
    this.password = await bcrypt.hash(this.password, 10);
    this.verified = this.emailVerified || this.phoneNumberVerified;
  }

  @AfterLoad()
  handleAfterLoad() {
    this.fullName = this.firstName + ' ' + this.lastName;
  }

  async comparePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }

  toJSON() {
    return instanceToPlain(this);
  }
}
