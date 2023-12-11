import type { Metadata } from "next";
import { Box } from "@mui/material";
import Header from "../components/board/Header";

export const metadata: Metadata = {
  title: "JDG's Board",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Box
        justifyContent="center"
        sx={{
          display: "flex",
          backgroundColor: "rgb(250, 250, 250)",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        {children}
        <Header></Header>
      </Box>
    </>
  );
}
