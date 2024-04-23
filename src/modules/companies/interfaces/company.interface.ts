export enum CompanyType {
  INDIVIDUAL = 'INDIVIDUAL',
  SITE = 'SITE',
  VENDOR = 'VENDOR',
  SPONSOR = 'SPONSOR',
}
export interface ICompany {
  id: string;
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
  type: CompanyType;
  status: boolean;
  industry?: string;
}
