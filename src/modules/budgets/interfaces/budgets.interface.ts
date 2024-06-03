import { ITrial } from 'src/modules/trials/interfaces/trials.interface';
import { Trial } from '../../trials/entities/trial.entity';

export enum Currency {
  Naira = 'Naira',
  Dollar = 'Dollar',
}

export interface IBudget {
  id: string;
  trial: Trial;
  currency: Currency;
  totalBudget: string;
  startDate: string;
  endDate: string;
  siteFees: string;
  personnelFees: string;
  equipmentAndSuppliesFees: string;
  budgetDescription: string;
  additionalInformation: string;
}
