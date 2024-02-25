import IAccountBookItem from "./IAccountBookItem";

export default interface IAccountBookList {
  key: string;
  date: Date;
  type: "支出" | "輸入" | "貯金" | "移動";
  payment: "通帳" | "現金" | "クレジット";
  account: string;
  title: string;
  items: IAccountBookItem[];
}
