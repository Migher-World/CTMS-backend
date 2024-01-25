import { Column, Entity } from "typeorm";
import { AbstractEntity } from "../../../shared/entities/abstract-entity";
import { IPatient } from "../interfaces/patient.interface";

@Entity('patients')
export class Patient extends AbstractEntity implements IPatient {
    @Column()
    name: string;

    @Column()
    patientId: string;

    @Column({type: 'date'})
    enrollmentDate: string;

    @Column()
    enrollmentSite: string;

    @Column()
    enrollmentStatus: string;

    @Column()
    birthDate: string;

    @Column()
    gender: string;

    @Column()
    nationality: string;

    @Column()
    consentRecived: boolean;

    @Column()
    commencedTreatment: boolean;

    @Column()
    droppedOut: boolean;

    @Column()
    visitCompleted: boolean;

    @Column()
    withinWindow: boolean;

    @Column()
    companyId: string;
}