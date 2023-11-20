"use client";
import React from "react";
import Box from "@mui/material/Box";
import Header from "@/app/components/board/Header";
import { useSearchParams } from "next/navigation";
import IMenuItem from "../interfaces/IMenuItem";

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
      sx={{
        backgroundColor: "rgb(250, 250, 250)",
        height: "100vh",
        width: "100%",
        padding: "64px",
      }}
    >
      <Header {...props}></Header>
      testset
    </Box>
  );
}
