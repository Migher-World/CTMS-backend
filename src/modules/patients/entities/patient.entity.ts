import { Column, Entity } from "typeorm";
import { AbstractEntity } from "../../../shared/entities/abstract-entity";
import { EnrollmentStatus, IPatient } from "../interfaces/patient.interface";

@Entity('patients')
export class Patient extends AbstractEntity implements IPatient {
    @Column()
    patientId: string;

    @Column({type: 'timestamp'})
    enrollmentDate: string;

    @Column({type: 'enum', enum: EnrollmentStatus})
    enrollmentStatus: EnrollmentStatus;

    @Column()
    birthDate: string;

    @Column()
    gender: 'male' | 'female';

    @Column()
    nationality: string;

    @Column()
    consentReceived: boolean;

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