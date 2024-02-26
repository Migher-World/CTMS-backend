import { ITrial } from "src/modules/trials/interfaces/trials.interface";

export enum Currency {
    Naira= 'Naira',
    Dollar= 'Dollar',
}

export interface IBudget {
    id: string;
    trialName: string;
    trial: ITrial;
    currency: Currency;
    totalBudget: string;
    startDate: string;
    endDate: string;
    siteFees: string;
    personnelFees: string;
    equipmentAndSuppliesFees: string;
    budgetDescription: string;
    additionalInformation: string;
   // attachments: Array<string>;
   attachments: string;
}