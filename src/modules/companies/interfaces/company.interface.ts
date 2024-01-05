export enum CompanyCategory {
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
    type: CompanyCategory;
    status: boolean;
    industry?: string;
}