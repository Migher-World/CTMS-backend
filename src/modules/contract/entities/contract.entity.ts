import { AbstractEntity } from "src/shared/entities/abstract-entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { IContract } from "../interfaces/contract.interface";
import { Trial } from "src/modules/trials/entities/trial.entity";

@Entity('contracts')
export class Contract extends AbstractEntity implements IContract{
    @Column()
    trialName: string;

    @ManyToOne(()=> Trial, trial => trial.contracts)
    @JoinColumn()
    trial: Trial;

    @Column()
    contractTitle: string;

    @Column()
    effectiveDate: string;

    @Column()
    expirationDate: string;

    @Column()
    organization: string;

    @Column()
    serviceProvider: string;

    @Column()
    description: string;

    @Column()
    paymentTerms: string;

    @Column()
    terminationClause: string;

    @Column()
    confidentiality: string;

    @Column()
    insuranceRequirement: string;

    @Column()
    contractValue: string;

    @Column()
    paymentSchedule: string;

    @Column({default: 'draft'})
    status: string;
}
