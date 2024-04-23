import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Category, ClientType, IClient } from '../interfaces/clients.interface';
import { AbstractEntity } from '../../../shared/entities/abstract-entity';
import { User } from '../../users/entities/user.entity';

@Entity('clients')
export class Client extends AbstractEntity implements IClient {
  @Column()
  name: string;

  @Column()
  clientEmail: string;

  @Column()
  contactPerson: string;

  @Column({ enum: Category, type: 'enum' })
  category: Category;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn()
  user: User;

  @Column()
  userId: string;

  @Column({ type: 'enum', enum: ClientType })
  clientType: ClientType;
}
