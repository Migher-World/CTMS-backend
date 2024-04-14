import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ContractStatus, IContract } from "../interfaces/contract.interface";
import { AbstractEntity } from "../../../shared/entities/abstract-entity";
import { Trial } from "../../trials/entities/trial.entity";

@Entity('contracts')
export class Contract extends AbstractEntity implements IContract{
    @ManyToOne(()=> Trial, trial => trial.contracts)
    @JoinColumn()
    trial: Trial;

    @Column()
    trialId: string;

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

    @Column({type: 'enum', enum: ContractStatus})
    contractStatus: ContractStatus;
}
