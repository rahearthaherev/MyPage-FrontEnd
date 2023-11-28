import IStylingData from "./IStylingData";

export default interface IStylingProps {
  stylingData?: IStylingData;
  setStylingData: (data: any) => void;
}
