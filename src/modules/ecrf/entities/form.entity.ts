import { Entity, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../shared/entities/abstract-entity';
import { FormSchema } from '../dto/form.dto';
import { Trial } from '../../trials/entities/trial.entity';

@Entity()
export class FormEntity extends AbstractEntity {
    @Column()
    name: string;

    @Column('json')
    schema: FormSchema;

    @Column()
    description: string;

    @Column()
    trialId: string;

    @ManyToOne(() => Trial)
    trial: Trial;

    @Column()
    category: string;
}