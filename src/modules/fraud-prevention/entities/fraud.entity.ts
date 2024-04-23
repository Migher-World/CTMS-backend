import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import {
  IFraud,
  SecurityLevel,
  Category,
  FaultNature,
  ActivityStatus,
} from '../interfaces/fraud-prevention.interfaces';
import { AbstractEntity } from '../../../shared/entities/abstract-entity';
import { User } from '../../users/entities/user.entity';

@Entity('frauds')
export class FraudPrevention extends AbstractEntity implements IFraud {
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

  @Column()
  participantId: string;

  @Column()
  trialId: string;

  @Column()
  details: string;

  @Column({ enum: FaultNature, type: 'enum' })
  natureOfFraud: FaultNature;

  @Column()
  witnessName: string;

  @Column({ enum: ActivityStatus, type: 'enum' })
  status: ActivityStatus;

  @Column()
  witnessContact: string;

  @Column()
  relevantInformation: string;

  @Column()
  documents: string;

  @Column()
  actionTaken: string;

  @Column()
  createdById: string;

  @ManyToOne(() => User)
  @JoinColumn()
  createdBy: User;
}
