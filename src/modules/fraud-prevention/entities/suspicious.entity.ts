import { AbstractEntity } from 'src/shared/entities/abstract-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Category, FaultNature, ISuspicious, SecurityLevel } from '../interfaces/fraud-prevention.interfaces';
import { Trial } from 'src/modules/trials/entities/trial.entity';
import { User } from 'src/modules/users/entities/user.entity';

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

  @Column()
  participantId: string;

  @Column()
  trialId: string;

  @ManyToOne(() => Trial)
  @JoinColumn()
  trial: Trial;

  @Column()
  details: string;

  @Column({ enum: FaultNature, type: 'enum' })
  natureOfFraud: FaultNature;

  @Column()
  witnessName: string;

  @Column()
  witnessContact: string;

  @Column()
  relevantInformation: string;

  @Column()
  actionTaken: string;

  @Column()
  createdById: string;

  @ManyToOne(() => User)
  @JoinColumn()
  createdBy: User;
}
