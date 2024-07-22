import { Column, Entity, ManyToOne } from "typeorm";
import { AbstractEntity } from "../../../shared/entities/abstract-entity";
import { FormEntity } from "./form.entity";

@Entity()
export class FormResponse extends AbstractEntity {
    @Column('json')
    response: object;

    @Column()
    formId: string;

    @ManyToOne(() => FormEntity)
    form: FormEntity;
}