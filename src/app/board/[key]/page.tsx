"use client";

import IBoard from "@/app/interfaces/IBoard";
import { Box, Divider, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const HTMLRenderer = (htmlString: string) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

export default function boardPage() {
  const params = useParams();
  const key = React.useState(params.key);
  const [board, setBoard] = React.useState<IBoard | undefined>(undefined);
  const contentHTML = React.useRef<HTMLElement>(null);
  const getBoard = async () => {
    await axios
      .post("http://localhost:6974/board/getpage", key)
      .then((resp: any) => {
        setBoard(resp.data);
      });
  };
  useEffect(() => {
    getBoard();
  }, []);
  return (
    <Paper
      sx={{
        width: { lg: "1080px", xs: "100vh" },
        paddingTop: "64px",
      }}
    >
      <Box
        sx={{
          padding: "15px",
        }}
      >
        <Typography variant="h4">{board?.title}</Typography>
        <Box sx={{ display: "flex" }}>
          <Typography variant="subtitle2" color="GrayText" marginRight={1}>
            {board?.author}
          </Typography>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Typography variant="subtitle2" color="GrayText" marginLeft={1}>
            {board?.modified_time ? board?.modified_time : board?.create_time}
          </Typography>
        </Box>
      </Box>
      <Divider></Divider>
      <Box
        sx={{
          padding: "15px",
        }}
      ></Box>
    </Paper>
  );
}
