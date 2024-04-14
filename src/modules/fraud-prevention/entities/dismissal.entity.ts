import { Column, Entity } from "typeorm";
import { FaultNature, IDismissal } from "../interfaces/fraud-prevention.interfaces";
import { AbstractEntity } from "../../../shared/entities/abstract-entity";

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

    @Column({ nullable: true })
    participantId: string;

    @Column({ nullable: true })
    participantsDetail: string;

    @Column({ nullable: true })
    dismissalReason: string;

    @Column({ nullable: true })
    actionTaken: string;

    @Column({ nullable: true })
    supportingEvidence: string;
}