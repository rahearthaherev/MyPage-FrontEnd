import IAccountBookItem from "./IAccountBookItem";

export default interface IAccountBookList {
  key?: string;
  date: Date;
  type: string;
  payment: string;
  account: string;
  beforeAccount?: string;
  afterAccount?: string;
  amount?: number;
  title: string;
  details: IAccountBookItem[];
}
