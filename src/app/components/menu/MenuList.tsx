import * as React from "react";
import * as Icon from "../../constants/Icon";
import HomeIcon from "@mui/icons-material/Home";
import AboutIcon from "@mui/icons-material/InfoOutlined";
import ProjectIcon from "@mui/icons-material/AccountTreeOutlined";
import BulbIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import ContactIcon from "@mui/icons-material/ContactSupportOutlined";
import BoardIcon from "@mui/icons-material/Grading";
import DocumentIcon from "@mui/icons-material/TextSnippetOutlined";
import ClothsIcon from "@mui/icons-material/CheckroomOutlined";
import DefaultIcon from "@mui/icons-material/FormatIndentIncreaseOutlined";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { IsVarOpenAtom, QuickAtom } from "../../recoil/atoms";
import { MenuListContext } from "@/app/views/sidevar";
import { useRouter } from "next/navigation";
import IMenuCategory from "@/app/interfaces/IMenuCategory";
import { log } from "console";

export default function MenuList(props: IMenuCategory) {
  const open = useRecoilValue(IsVarOpenAtom);
  const menuContext = React.useContext(MenuListContext);
  const menuDetailList = menuContext?.menuDetailList;
  const url = React.useRef("/");
  const router = useRouter();
  const [scrollPosition, setScrollPosition] = useRecoilState(QuickAtom);

  const handleMenuClick = (url: string) => {
    setScrollPosition({ position: window.scrollY });
    router.push(url);
    router.refresh();
  };

  return (
    <>
      <Divider />
      <List>
        {menuDetailList?.map((item, index) => {
          if (item.detail_key === props.detail_key) {
            if (item.detail_key === "00001") {
              url.current = `/#${item.menu_name}`;
            } else if (item.detail_key === "00004") {
              url.current = `/projects/styling`;
            } else {
              url.current = `/board/?title=${item.menu_name}&key=${item.menu_sub_key}`;
            }
            const uri = url.current;

            return (
              <ListItem key={index} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  onClick={() => {
                    handleMenuClick(uri);
                  }}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {toIcon(item.menu_icon!)}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.menu_name}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            );
          }
        })}
      </List>
    </>
  );
}

function toIcon(value: string) {
  switch (value) {
    case Icon.Home:
      return <HomeIcon />;
    case Icon.About:
      return <AboutIcon />;
    case Icon.Project:
      return <ProjectIcon />;
    case Icon.Skill:
      return <BulbIcon />;
    case Icon.Contact:
      return <ContactIcon />;
    case Icon.Board:
      return <BoardIcon />;
    case Icon.Document:
      return <DocumentIcon />;
    case Icon.Cloth:
      return <ClothsIcon />;
    default:
      return <DefaultIcon />;
  }
}
