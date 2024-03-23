import { AbstractEntity } from "src/shared/entities/abstract-entity";
import { Column, Entity } from "typeorm";
import { Category, FaultNature, ISuspicious, SecurityLevel } from "../interfaces/fraud-prevention.interfaces";

@Entity('suspicious')
export class Suspicious extends AbstractEntity implements ISuspicious{
    @Column({enum: SecurityLevel, type:'enum'})
    securityLevel: SecurityLevel;

    @Column()
    reporterName: string;

    @Column()
    reporterEmail: string;

    @Column()
    reporterContact: string;

    @Column({enum: Category, type:'enum'})
    category: Category;

    @Column()
    date: string;

    @Column()
    time: string;

    @Column()
    participantId: string;

    @Column()
    trialId: string;

    @Column()
    details: string;

    @Column({enum: FaultNature, type:'enum'})
    natureOfFraud: FaultNature;

    @Column()
    witnessName: string;

    @Column()
    witnessContact: string;

    @Column()
    relevantInformation: string;
    
    @Column()
    actionTaken: string;
}