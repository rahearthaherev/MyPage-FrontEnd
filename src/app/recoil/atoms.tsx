"use client";

import { atom } from "recoil";
import IBoard from "../interfaces/IBoard";
import IMenuItem from "../interfaces/IMenuItem";

export const IsVarOpenAtom = atom<boolean>({
  key: "open",
  default: false,
});

export const BoardAtom = atom<IMenuItem>({
  key: "board",
  default: {
    menu_name: "",
    menu_sub_key: "",
  },
});
