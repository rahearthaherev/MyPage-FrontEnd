"use client";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import axios from "axios";
import React, { useEffect, useRef } from "react";
import IMenuItem from "@/app/interfaces/IMenuItem";
import { useRouter, useSearchParams } from "next/navigation";

function usePrevious(value: any) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default function Header() {
  const params = useSearchParams();
  const prevParam = usePrevious(params);
  const router = useRouter();
  const uri = React.useRef("/board/");
  const [menuList, setMenuList] = React.useState<IMenuItem[] | undefined>(
    undefined
  );

  const props: IMenuItem = React.useMemo(
    () => ({
      menu_name: params.get("title")!,
      menu_sub_key: params.get("key")!,
    }),
    [params]
  );

  const handleMenuClick = (url: string) => {
    router.push(url);
    router.refresh();
  };
  const getMenu = async () => {
    await axios
      .post(process.env.NEXT_PUBLIC_SPRING_SERVER + "/board/header", props)
      .then((resp) => {
        const menuList: IMenuItem[] = resp.data;
        setMenuList(menuList);
      });
  };

  React.useEffect(() => {
    // 변경 전과 후의 값이 다를 때 getMenu() 호출
    if (prevParam !== params) {
      getMenu();
    }
  }, [prevParam, params, getMenu]); // boardRecoil 값 변화 감지

  return (
    <>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: "rgb(100, 100, 100)" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { sm: "block" },
              fontSize: 30,
              marginLeft: "64px",
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => {
              router.push(
                uri.current +
                  `?title=${props.menu_name}&key=${props.menu_sub_key}`
              );
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
