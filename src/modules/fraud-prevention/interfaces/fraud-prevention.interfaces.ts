import { ITrial } from "src/modules/trials/interfaces/trials.interface";

export enum SecurityLevel{
    LOW = 'Low',
    MODERATE = 'Moderate',
    HIGH = 'High',
}

export enum Category{
    RISKY = 'Riscky'
}

export enum FaultNature{
    UNAUTHORIZED_ACCESS = 'Unauthorized Access',
    MANIPULATION = 'Manipulation',
    FALSIFICATION_OF_RECORDS = 'Falsification of Records',
    FINANCIAL_FRAUD = 'Financial Fraud',
    OTHERS = 'Others'
}

export interface IFraud {
    securityLevel: SecurityLevel;
    reporterName: string;
    reporterEmail: string;
    reporterContact: string;
    category: Category;
    date: string;
    time: string;
    participantId: string;
    trialId: string;
    details: string;
    natureOfFraud: FaultNature;
    witnessName: string;
    witnessContact: string;
    relevantInformation: string;
    // documents: string;
    actionTaken: string;
}

export interface ISuspicious{
    securityLevel: SecurityLevel;
    reporterName: string;
    reporterEmail: string;
    reporterContact: string;
    category: Category;
    date: string;
    time: string;
    participantId: string;
    trialId: string;
    details: string;
    natureOfFraud: FaultNature;
    witnessName: string;
    witnessContact: string;
    relevantInformation: string;
    // documents: string;
    actionTaken: string;
}

export interface IDismissal{
    caseId: string;
    date: string;
    time: string;
    description: string;
    summary: string;
    natureOfFraud: FaultNature;
    // supportingEvidence: string;
    participantId: string;
    participantsDetail: string;
    dismissalReason: string;
    actionTaken: string;   
}