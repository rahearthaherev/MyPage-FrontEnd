import IClothesType from "./IClothes";

export default interface IClothesTreeProps {
  type: IClothesType[];

  setSelectedType: (e: any) => void;
  setItem: (e: any) => void;
}

export interface IClothesCRUDProps {
  type: IClothesType[];
  seletedType: string;
  item: string;
  setSelectedType: (e: any) => void;
  setItem: (e: any) => void;
}
