import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import {
  ActivityStatus,
  Category,
  FaultNature,
  ISuspicious,
  SecurityLevel,
} from '../interfaces/fraud-prevention.interfaces';
import { AbstractEntity } from '../../../shared/entities/abstract-entity';
import { User } from '../../users/entities/user.entity';

@Entity('suspicious')
export class Suspicious extends AbstractEntity implements ISuspicious {
  @Column({ enum: SecurityLevel, type: 'enum' })
  securityLevel: SecurityLevel;

  @Column()
  reporterName: string;

  @Column()
  reporterEmail: string;

  @Column()
  reporterContact: string;

  @Column({ enum: Category, type: 'enum' })
  category: Category;

  @Column()
  date: string;

  @Column()
  time: string;

  @Column({ nullable: true })
  participantId: string;

  @Column()
  trialId: string;

  @Column()
  details: string;

  @Column({ enum: FaultNature, type: 'enum' })
  natureOfFraud: FaultNature;

  @Column({ nullable: true })
  witnessName: string;

  @Column({ enum: ActivityStatus, type: 'enum' })
  status: ActivityStatus;

  @Column({ nullable: true })
  witnessContact: string;

  @Column({ nullable: true })
  relevantInformation: string;

  @Column({ nullable: true })
  actionTaken: string;

  @Column({ nullable: true })
  documents: string;

  @Column()
  createdById: string;

  @ManyToOne(() => User)
  @JoinColumn()
  createdBy: User;
}
