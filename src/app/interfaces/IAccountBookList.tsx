import IAccountBookItem from "./IAccountBookItem";

export default interface IAccountBookList {
  key?: string;
  date: Date;
  type: string;
  payment: string;
  account: string;
  from?: string;
  to?: string;
  amount?: number;
  title: string;
  details: IAccountBookItem[];
}
