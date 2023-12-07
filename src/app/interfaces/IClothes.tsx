interface ClothsType {}

export default interface IClothesType {
  type: string;
}

export interface IClothesItem {
  type: string;
  name: string;
  index?: number;
  status: number;
}
