"use client";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import Main from "./views/main";
import Header from "./components/main/Header";

// styled 함수를 사용하여 스타일링된 컴포넌트 생성
const ResponsiveContainer = styled("div")({
  width: "900px",
  margin: "0 auto",
  // 미디어 쿼리를 사용하여 화면 크기에 따라 스타일 변경
  "@media (max-width: 900px)": {
    width: "100%",
  },
});

export default function Container() {
  return (
    <Box>
      <Box
        sx={{
          width: "100% -64px",
          marginRight: "64px",
        }}
      >
        <Box>
          <ResponsiveContainer>
            <Header />
            <Main></Main>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
}
