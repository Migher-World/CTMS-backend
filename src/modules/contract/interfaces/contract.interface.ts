import { IInvoice } from "src/modules/invoices/interfaces/invoices.interface";
import { ITrial } from "src/modules/trials/interfaces/trials.interface";

export enum ContractType {
    PartTime = 'Part Time'
}

export enum MileStone {
    Level1 = 'Level 1'
}

export interface IContract {
    id: string;
    trialName: ITrial; //refer to trial db: ITrial
    contractType: ContractType;
    contractAmount: string;
    duration: string;
    paymentTerms: string;
    startDate: string;
    endDate: string;
    mileStone: MileStone; // IMilestone or an array of milestons not enum
    InvoicesRecieved: IInvoice;
    InvoicesPaid: IInvoice;
    outstandingAmount: string; // IInvoice or add all invoice details as Invoice and relate it to IInvoice
    attachments: string // An array of attachments
}
