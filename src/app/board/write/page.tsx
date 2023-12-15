"use client";

import { Box } from "@mui/material";
import * as React from "react";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/app/components/board/TextEditor"), {
  ssr: false,
});

export default function WritePage() {
  return (
    <>
      <Box
        sx={{
          width: { lg: "1080px", xs: "100vh" },
          height: "100%",
          paddingTop: "64px",
          backgroundColor: "white",
          border: "1px solid lightgrey",
        }}
      >
        <Editor />
      </Box>
    </>
  );
}
