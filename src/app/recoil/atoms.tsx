"use client";

import { atom } from "recoil";

export const IsVarOpenAtom = atom<boolean>({
  key: "open",
  default: false,
});

export const RenderingAtom = atom<boolean>({
  key: "render",
  default: false,
});
