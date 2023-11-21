"use client";
import React from "react";
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

  return <BoardMain {...props}></BoardMain>;
}
