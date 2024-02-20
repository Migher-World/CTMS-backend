import { AbstractEntity } from "src/shared/entities/abstract-entity";
import { Column, Entity, OneToMany } from "typeorm";
import { ITrial } from "../interfaces/trials.interface";
import { Budget } from "src/modules/budgets/entities/budget.entity";
import { Contract } from "src/modules/contract/entities/contract.entity";

@Entity('trials')
export class Trial extends AbstractEntity implements ITrial{
    @Column()
    name: string;

    @OneToMany(()=> Budget, budget => budget.trial)
    budgets: Budget[];

    @OneToMany(()=> Contract, contract => contract.trial)
    contracts: Contract[];
}
