import * as React from "react";
import axios from "axios";
import ISideMenu from "../../interfaces/ISideMenu";
import MenuList from "./MenuList";
import { useRecoilState } from "recoil";
import { RenderingAtom } from "@/app/recoil/atoms";

export default function DetailMenu() {
  const [sideMenu, setSideMenu] = React.useState<ISideMenu[]>([]);
  const [rendering, setRendering] = useRecoilState(RenderingAtom);
  const printmenu = async () => {
    await axios.get("http://localhost:6974/sidemenu/").then(async (resp) => {
      setSideMenu(resp.data);
    });
  };

  React.useEffect(() => {
    printmenu();
  }, []);
  rendering;
  return (
    <>
      {sideMenu.map((menu) => {
        return (
          <MenuList key={menu.menu_key} detail_key={menu.detail_key}></MenuList>
        );
      })}
    </>
  );
}
