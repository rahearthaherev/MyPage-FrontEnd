"use client";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import axios from "axios";
import React from "react";
import IMenuItem from "@/app/interfaces/IMenuItem";
import { useRouter, useSearchParams } from "next/navigation";

export default function Header() {
  const params = useSearchParams();
  const props: IMenuItem = {
    menu_name: params.get("title")!,
    menu_sub_key: params.get("key")!,
    detail_key: "",
    menu_icon: "",
  };

  const router = useRouter();
  const uri = React.useRef("/board/");
  const [menuList, setMenuList] = React.useState<IMenuItem[] | undefined>(
    undefined
  );
  const handleMenuClick = (url: string) => {
    router.push(url);
    router.refresh();
  };
  const getMenu = async () => {
    await axios
      .post("http://localhost:6974/board/header", props)
      .then((resp) => {
        setMenuList(resp.data);
      });
  };
  React.useEffect(() => {
    getMenu();
  }, []);

  return (
    <>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: "darkgray" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { sm: "block" },
              fontSize: 30,
              marginLeft: "64px",
            }}
          >
            {props.menu_name}
          </Typography>
          <Box
            sx={{ display: { xs: "none", sm: "block" }, marginRight: "150px" }}
          >
            {menuList?.map((item, index) => {
              const url =
                uri.current +
                `?title=${item.menu_name}&key=${item.menu_sub_key}`;
              return (
                <Button
                  key={index}
                  sx={{ color: "#fff" }}
                  onClick={() => {
                    handleMenuClick(url);
                  }}
                >
                  {item.menu_name}
                </Button>
              );
            })}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
