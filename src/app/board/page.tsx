"use client";
import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import IMenuItem from "../interfaces/IMenuItem";
import BoardMain from "../components/board/BoardMain";
import { useRecoilState } from "recoil";
import { BoardAtom } from "../recoil/atoms";

export default function BoardPage() {
  const [boardRecoil, setBoardRecoil] = useRecoilState(BoardAtom);

  const params = useSearchParams();
  const props: IMenuItem = useMemo(
    () => ({
      menu_name: params.get("title")!,
      menu_sub_key: params.get("key")!,
    }),
    [params]
  );

  useEffect(() => {
    if (
      props.menu_name !== boardRecoil.menu_name ||
      props.menu_sub_key !== boardRecoil.menu_sub_key
    ) {
      setBoardRecoil(props);
    }
  }, [props, boardRecoil, setBoardRecoil]);

  return (
    <>
      <BoardMain></BoardMain>
    </>
  );
}
