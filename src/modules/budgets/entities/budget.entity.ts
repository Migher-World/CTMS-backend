import { AbstractEntity } from "src/shared/entities/abstract-entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Currency, IBudget } from "../interfaces/budgets.interface";
import { Trial } from "src/modules/trials/entities/trial.entity";

@Entity('budgets')
export class Budget extends AbstractEntity implements IBudget{
    @ManyToOne(()=> Trial, trial => trial.budgets)
    @JoinColumn()
    trial: Trial;

    @Column()
    trialName: string;

    @Column()
    currency: Currency;

    @Column()
    totalBudget: string;

    @Column()
    startDate: string;

    @Column()
    endDate: string;

    @Column()
    siteFees: string;

    @Column()
    personnelFees: string;

    @Column()
    equipmentAndSuppliesFees: string;

    @Column()
    budgetDescription: string;

    @Column()
    additionalInformation: string;
}
