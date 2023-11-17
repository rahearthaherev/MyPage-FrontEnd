import IMenuCategory from "./IMenuCategory";
import IMenuItem from "./IMenuItem";

export default interface ISideMenuList {
  menuCategory: IMenuCategory[];
  menuDetailList: IMenuItem[];
  resetMenu: () => void;
}
