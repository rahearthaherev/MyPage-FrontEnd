"use client";
import { Box, TextField } from "@mui/material";
import dynamic from "next/dynamic";
import styled from "styled-components";
import * as React from "react";
import TextEditor from "@/app/components/board/TextEditor";
import "react-quill/dist/quill.snow.css";

export default function WritePage() {
  return (
    <>
      <Box
        sx={{
          width: { lg: "1080px", xs: "100vh" },
          paddingTop: "64px",
          backgroundColor: "rgb(250, 250 ,250)",
        }}
      >
        <TextEditor />
      </Box>
    </>
  );
}
