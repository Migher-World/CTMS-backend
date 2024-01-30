import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../shared/entities/abstract-entity';
import { User } from '../../users/entities/user.entity';
import { Issue } from './issues.entity';

@Entity('comments')
export class Comment extends AbstractEntity {
  @Column('text')
  content: string;

  @ManyToOne(() => User)
  author: User;

  @Column()
  authorId: string;

  @ManyToOne(() => Issue)
  issue: Issue;

  @Column()
  issueId: string;
}
