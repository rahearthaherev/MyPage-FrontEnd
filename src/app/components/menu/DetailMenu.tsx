import * as React from "react";
import MenuList from "./MenuList";
import { MenuListContext } from "@/app/views/sidevar";

export default function DetailMenu() {
  const menuContext = React.useContext(MenuListContext);
  const menuCategory = menuContext?.menuCategory;

  return (
    <>
      {menuCategory?.map((category) => {
        return (
          <MenuList
            key={category.menu_key}
            menu_key={category.menu_key}
            detail_key={category.detail_key}
            menu_type={category.menu_type}
          ></MenuList>
        );
      })}
    </>
  );
}
