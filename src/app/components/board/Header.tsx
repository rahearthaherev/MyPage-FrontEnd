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
import { useRecoilValue } from "recoil";
import { BoardAtom } from "@/app/recoil/atoms";

function usePrevious(value: any) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default function Header() {
  const boardRecoil = useRecoilValue(BoardAtom);
  const prevBoardRecoil = usePrevious(boardRecoil);
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
      .post("http://localhost:6974/board/header", boardRecoil)
      .then((resp) => {
        setMenuList(resp.data);
      });
  };

  React.useEffect(() => {
    // 변경 전과 후의 값이 다를 때 getMenu() 호출
    if (prevBoardRecoil !== boardRecoil) {
      getMenu();
    }
  }, [prevBoardRecoil, boardRecoil]); // boardRecoil 값 변화 감지

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
            {boardRecoil.menu_name}
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
