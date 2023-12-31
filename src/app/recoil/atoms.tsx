"use client";

import { atom } from "recoil";
import IQuick from "../interfaces/IQuick";

export const IsVarOpenAtom = atom<boolean>({
  key: "open",
  default: false,
});

export const QuickAtom = atom<IQuick>({
  key: "quick",
  default: {
    position: 0,
  },
});
