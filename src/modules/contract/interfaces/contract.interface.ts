import { IInvoice } from "src/modules/invoices/interfaces/invoices.interface";
import { ITrial } from "src/modules/trials/interfaces/trials.interface";

export enum ContractStatus {
    UPLOADED = 'Uploded',
    APPROVED = 'Approved',
    REJECTED = 'Rejected',
    SENT_FOR_SIGNING = 'Sent For Signing',
    FULLY_SIGNED = 'Fully Signed'
}

export interface IContract {
    id: string;
    trialId: string;
    contractTitle: string;
    effectiveDate: string;
    expirationDate: string;
    organization: string;
    serviceProvider: string;
    description: string;
    paymentTerms: string;
    terminationClause: string;
    confidentiality: string;
    insuranceRequirement: string;
    contractValue: string;
    paymentSchedule: string;
    contractStaus: ContractStatus;
}
