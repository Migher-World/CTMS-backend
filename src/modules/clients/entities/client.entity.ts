import { AbstractEntity } from 'src/shared/entities/abstract-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Category, ClientType, IClient } from '../interfaces/clients.interface';
import { User } from 'src/modules/users/entities/user.entity';

@Entity('clients')
export class Client extends AbstractEntity implements IClient {
  @Column()
  name: string;

  @Column()
  clientEmail: string;

  @Column()
  contactPerson: string;

  @Column({ enum: Category })
  category: Category;

  @ManyToOne(()=> User, {eager: true})
  @JoinColumn()
  user: User;

  @Column({type: 'enum', enum: ClientType})
  clientType: ClientType;
}
