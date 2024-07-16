import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../../../shared/entities/abstract-entity';
import { FormSchema } from '../dto/form.dto';

@Entity()
export class Form extends AbstractEntity {
    @Column()
    name: string;

    @Column('json')
    schema: FormSchema;

    // @Column()

    // Add more columns as needed

    // Add relationships with other entities if necessary

    // Add custom methods or decorators as needed
}