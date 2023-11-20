"use client";
import React from "react";
import Box from "@mui/material/Box";
import Header from "@/app/components/board/Header";
import { useSearchParams } from "next/navigation";
import IMenuItem from "../interfaces/IMenuItem";
import BoardMain from "../components/board/BoardMain";

export default function BoardPage() {
  const params = useSearchParams();
  const props: IMenuItem = {
    menu_name: params.get("title")!,
    menu_sub_key: params.get("key")!,
    detail_key: "",
    menu_icon: "",
  };

  return (
    <Box
      justifyContent="center"
      sx={{
        display: "flex",
        backgroundColor: "rgb(250, 250, 250)",
        height: "100vh",
        width: "100%",
      }}
    >
      <Header {...props}></Header>
      <BoardMain {...props}></BoardMain>
    </Box>
  );
}
