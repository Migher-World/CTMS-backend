import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../shared/entities/abstract-entity';
import { User } from '../../users/entities/user.entity';
import { Comment } from './comment.entity';

export enum IssueStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  CLOSE = 'CLOSE',
}

export enum IssueSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

@Entity('issues')
export class Issue extends AbstractEntity {
  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ type: 'enum', enum: IssueStatus, default: IssueStatus.OPEN })
  status: IssueStatus;

  @Column({ type: 'enum', enum: IssueSeverity, default: IssueSeverity.LOW })
  severity: IssueSeverity;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn()
  assignedTo: User;

  @Column({ nullable: true })
  assignedToId: string;

  @OneToMany(() => Comment, (comment) => comment.issue, { eager: true })
  comments: Comment[];

  @Column()
  authorId: string;

  @ManyToOne(() => User)
  @JoinColumn()
  author: User;

  @Column()
  companyId: string;

  @Column({ nullable: true })
  attachment: string;
}
