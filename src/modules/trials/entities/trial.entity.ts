import { AbstractEntity } from "src/shared/entities/abstract-entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { AgeGroup, BudgetCategory, ITrial, ProtocolDetails, RecuitmentPlan, RegulatoryCompliance } from "../interfaces/trials.interface";
import { Budget } from "src/modules/budgets/entities/budget.entity";
import { Contract } from "src/modules/contract/entities/contract.entity";
import { Company } from "src/modules/companies/entities/company.entity";

@Entity('trials')
export class Trial extends AbstractEntity implements ITrial{
    @Column()
    name: string;

    @OneToMany(()=> Budget, budget => budget.trial)
    budgets: Budget[];

    @OneToMany(()=> Contract, contract => contract.trial)
    contracts: Contract[];

    @Column()
    startDate: string;

    @Column()
    endDate: string;

    @Column({ enum: ProtocolDetails, type: 'enum' })
    protocolDetails: ProtocolDetails;

    @Column()
    objectives: string;

    @Column({ nullable: true })
    companyId: string;

    @ManyToOne(()=> Company, company => company.trials, { eager: true })
    @JoinColumn()
    site: Company;

    @Column()
    gender: 'male' | 'female';

    @Column({ enum: AgeGroup, type: 'enum' })
    ageGroup: AgeGroup;

    @Column({ enum: BudgetCategory, type: 'enum' })
    budgetCategory: BudgetCategory;

    @Column()
    allocatedAmount: string;

    @Column({ enum: RegulatoryCompliance, type: 'enum' })
    regulatoryCompliance: RegulatoryCompliance;

    @Column({ enum: RecuitmentPlan, type: 'enum' })
    recruitmentPlan: RecuitmentPlan;

    @Column()
    inclusionCriteria: string;
    
    @Column()
    exclusionCriteria: string;

    @Column()
    irbSubmissionDate: string;
}
