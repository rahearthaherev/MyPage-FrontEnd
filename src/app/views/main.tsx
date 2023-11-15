import { Box } from "@mui/material";

export default function Main({ children }: { children: React.ReactNode }) {
  //사이드 메뉴가 열려 있다면 240px의 마진, 사이드 메뉴가 닫혀 있다면 64px의 마진
  return <Box>{children}</Box>;
}
