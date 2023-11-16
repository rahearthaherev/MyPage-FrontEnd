import * as React from "react";
import IMenuItem from "../../interfaces/IMenuItem";
import * as Icon from "../../constants/Icon";
import HomeIcon from "@mui/icons-material/Home";
import AboutIcon from "@mui/icons-material/InfoOutlined";
import ProjectIcon from "@mui/icons-material/AccountTreeOutlined";
import BulbIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import ContactIcon from "@mui/icons-material/ContactSupportOutlined";
import BoardIcon from "@mui/icons-material/Grading";
import DocumentIcon from "@mui/icons-material/TextSnippetOutlined";
import DefaultIcon from "@mui/icons-material/FormatIndentIncreaseOutlined";

import axios from "axios";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useRecoilValue } from "recoil";
import { IsVarOpenAtom } from "../../recoil/atoms";
import ISideMenu from "../../interfaces/ISideMenu";

export default function MenuList(props: ISideMenu) {
  const [detailMenuList, setDetailMenuList] = React.useState<IMenuItem[]>([]);
  const open = useRecoilValue(IsVarOpenAtom);

  const printmenu = async () => {
    await axios.get("http://localhost:6974/sidemenu/menuitem").then((resp) => {
      setDetailMenuList(resp.data);
    });
  };

  React.useEffect(() => {
    printmenu();
  }, []);

  return (
    <>
      <Divider />
      <List>
        {detailMenuList.map((item, index) => {
          if (item.detail_key === props.detail_key) {
            return (
              <ListItem key={index} disablePadding sx={{ display: "block" }}>
                <ListItemButton
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
                    {toIcon(item.menu_icon)}
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
    default:
      return <DefaultIcon />;
  }
}
