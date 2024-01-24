import { IUser } from "src/modules/users/interfaces/user.interface";

export enum Category {}
export enum ClientType {
}

export interface IClient {
  id: string;
  name: string;
  clientEmail: string;
  contactPerson: string;
  category: Category;
  user: IUser;
  clientType: ClientType;
}
