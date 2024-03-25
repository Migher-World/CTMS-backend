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

export enum RecruitmentPlan{
    FULL_TIME = 'Full Time',
    PART_TIME = 'Part Time',
}

export interface ITrial {
    name: string;
    startDate: string;
    endDate: string;
    protocolDetails: ProtocolDetails;
    objectives: string;
    siteId: string;
    site: ICompany;
    companyId: string;
    company: ICompany;
    siteLocation: string;
    siteInvestigator:string;
    gender: 'male' | 'female';
    ageGroup: AgeGroup;
    budgetCategory: BudgetCategory;
    allocatedAmount: string;
    regulatoryCompliance: RegulatoryCompliance;
    recruitmentPlan: RecruitmentPlan;
    inclusionCriteria: string[];
    exclusionCriteria: string[];
    irbSubmissionDate: Date;
    trackingNumber: string;
    irbApprovalDocument: string;
}