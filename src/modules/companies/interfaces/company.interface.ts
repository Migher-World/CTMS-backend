export enum CompanyType {
  UCTSS = 'UCTSS',
  SITE = 'SITE',
  VENDOR = 'VENDOR',
  SPONSOR = 'SPONSOR',
}
export interface ICompany {
  id: string;
  name: string;
  address: string;
  email: string;
  siteType: string;
  phoneNumber: string;
  type: CompanyType;
  status: boolean;
  industry?: string;
}
