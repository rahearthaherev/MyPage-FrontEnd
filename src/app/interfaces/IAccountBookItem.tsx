export default interface IAccountBookItem {
  key?: string;
  subKey?: string;
  category:
    | "給与"
    | "食費"
    | "保険"
    | "ネコ"
    | "趣味"
    | "住居"
    | "通信"
    | "日用"
    | "交通"
    | "衣類"
    | "文化"
    | "美容"
    | "医療"
    | "その他";
  description: string;
  tax: number;
  amount: number;
}
