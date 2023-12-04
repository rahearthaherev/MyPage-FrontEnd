import IPersonalInfo from "./IPersonalInfo";

export default interface IMyProfileProps {
  personalInfo: IPersonalInfo;
  setPersonalInfo: (personalInfo: IPersonalInfo) => void;
}
