import { IUser } from "src/modules/users/interfaces/user.interface";

export enum Category {
  Test = 'Test',
}
export enum ClientType {
  Client = 'Client',
  Prospect = 'Prospect',
}

export interface IClient {
  id: string;
  name: string;
  clientEmail: string;
  contactPerson: string;
  category: Category;
  user: IUser;
  userId: string;
  clientType: ClientType;
}
