"use client"

import { Box } from "@mui/material"
import { IsVarOpenAtom } from "../recoil/atoms";
import { useRecoilValue } from "recoil";

export default function Main({
    children,
  }: {
    children: React.ReactNode
  }) {
    const bOpen = useRecoilValue(IsVarOpenAtom);
    //사이드 메뉴가 열려 있다면 240px의 마진, 사이드 메뉴가 닫혀 있다면 64px의 마진
    return <Box component="main"  sx={{ display: 'flex', marginRight:(bOpen ? '240px' : '64px'), flexGrow: 1, bgcolor: 'background.default', p: 3}}>
      {children}
    </Box>
}