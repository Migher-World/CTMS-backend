import { AbstractEntity } from "src/shared/entities/abstract-entity";
import { Column, Entity } from "typeorm";
import { FaultNature, IDismissal } from "../interfaces/fraud-prevention.interfaces";

@Entity('dismissals')
export class Dismissal extends AbstractEntity implements IDismissal{
    @Column()
    caseId: string;

    @Column()
    date: string;

    @Column()
    time: string;

    @Column()
    description: string;

    @Column()
    summary: string;

    @Column({enum: FaultNature, type: 'enum'})
    natureOfFraud: FaultNature;

    @Column()
    participantId: string;

    @Column()
    participantsDetail: string;

    @Column()
    dismissalReason: string;

    @Column()
    actionTaken: string;

    @Column()
    supportingEvidence: string;
}