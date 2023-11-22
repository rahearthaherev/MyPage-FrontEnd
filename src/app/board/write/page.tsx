"use client";
import "react-quill/dist/quill.snow.css";
import { Box, TextField } from "@mui/material";
import dynamic from "next/dynamic";
import styled from "styled-components";
import * as React from "react";

const Editor = dynamic(() => import("../../components/board/TextEditor"), {
  ssr: false,
});

export default function writePage() {
  return (
    <>
      <Box
        sx={{
          width: { lg: "1080px", xs: "100vh" },
          paddingTop: "64px",
          backgroundColor: "rgb(250, 250 ,250)",
        }}
      >
        <Editor />
      </Box>
    </>
  );
}
