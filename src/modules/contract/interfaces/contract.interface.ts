import { IInvoice } from "src/modules/invoices/interfaces/invoices.interface";
import { ITrial } from "src/modules/trials/interfaces/trials.interface";

export interface IContract {
    id: string;
    trialName: string;
    //trial: ITrial;
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
    status: string;
}
