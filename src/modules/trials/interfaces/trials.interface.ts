import { ICompany } from "src/modules/companies/interfaces/company.interface";

export enum ProtocolDetails{
    NORMAL = 'Normal',
}

export enum AgeGroup{
    INFANT = 'Infant',
    ADULT = 'Adult',
    TEENAGER = 'Teenager',
}

export enum BudgetCategory{
    EMERGENCY = 'Emergency',

}

export enum RegulatoryCompliance{
    COMPLIED = 'Complied',
    UNCOMPLIED = 'Uncomplied',
}

export enum RecuitmentPlan{
    FULL_TIME = 'Full Time',
    PART_TIME = 'Part Time',
}

export interface ITrial {
    name: string;
    startDate: string;
    endDate: string;
    protocolDetails: ProtocolDetails;
    objectives: string;
    companyId: string;
    site: ICompany;
    gender: 'male' | 'female';
    ageGroup: AgeGroup;
    budgetCategory: BudgetCategory;
    allocatedAmount: string;
    regulatoryCompliance: RegulatoryCompliance;
    recruitmentPlan: RecuitmentPlan;
    inclusionCriteria: string; //make an array of string
    exclusionCriteria: string;
    irbSubmissionDate: string;
    //irbApprovalDocument: string;
}