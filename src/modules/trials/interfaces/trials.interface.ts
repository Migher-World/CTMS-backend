import { ICompany } from 'src/modules/companies/interfaces/company.interface';

export enum ProtocolDetails {
  NORMAL = 'Normal',
}

export enum AgeGroup {
  INFANT = 'Infant',
  ADULT = 'Adult',
  TEENAGER = 'Teenager',
}

export enum TrialPermissions {
  CREATE_TRIAL = 'CREATE_TRIAL',
  UPDATE_TRIAL = 'UPDATE_TRIAL',
  DELETE_TRIAL = 'DELETE_TRIAL',
  VIEW_TRIAL = 'VIEW_TRIAL',
  ASSIGN_TRIAL = 'ASSIGN_TRIAL',
  ADD_PATIENT = 'ADD_PATIENT',
  REMOVE_PATIENT = 'REMOVE_PATIENT',
  ADD_SITE = 'ADD_SITE',
  REMOVE_SITE = 'REMOVE_SITE',
}

export enum BudgetCategory {
  EMERGENCY = 'Emergency',
}

export enum RegulatoryCompliance {
  NAFDAC = 'NAFDAC',
  NHREC = 'NHREC',
  MINISTRY_OF_HEALTH = 'Ministry of Health',
  OTHERS = 'Others',
}

export enum RecruitmentPlan {
  FULL_TIME = 'Full Time',
  PART_TIME = 'Part Time',
}

export interface ITrial {
  name: string;
  startDate: string;
  endDate: string;
  protocolDetails: ProtocolDetails;
  objectives: string;
  vendorId: string;
  sponsorId: string;
  vendor: ICompany;
  sponsor: ICompany;
  sites: ICompany[];
  companyId: string;
  company: ICompany;
  gender: 'male' | 'female';
  ageGroup: AgeGroup;
  // budgetCategory: BudgetCategory;
  allocatedAmount: string;
  regulatoryCompliance: RegulatoryCompliance;
  recruitmentPlan: RecruitmentPlan;
  inclusionCriteria: string;
  exclusionCriteria: string[];
  irbSubmissionDate: string;
  trackingNumber: string;
  irbApprovalDocument: string;
}
