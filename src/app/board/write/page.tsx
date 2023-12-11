"use client";
import { Box } from "@mui/material";
import * as React from "react";
import Editor from "@/app/components/board/TextEditor";

export default function WritePage() {
  return (
    <>
      <Box
        sx={{
          width: { lg: "1080px", xs: "100vh" },
          height: "100%",
          paddingTop: "64px",
          backgroundColor: "rgb(250, 250 ,250)",
        }}
      >
        <Editor />
      </Box>
    </>
  );
}
