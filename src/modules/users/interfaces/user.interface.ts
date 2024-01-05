import { ICompany } from '../../companies/interfaces/company.interface';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  status: boolean;
  password: string;
  roleId: string;
  companyId: string;
  company: ICompany;
  fullName: string;
  verified: boolean;
  emailVerified: boolean;
  phoneNumberVerified: boolean;
}
