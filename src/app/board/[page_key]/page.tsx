"use client";

import IBoard from "@/app/interfaces/IBoard";
import { BoardAtom } from "@/app/recoil/atoms";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";

const HTMLRenderer = (htmlString: string) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

export default function BoardPage() {
  const params = useParams();
  const router = useRouter();
  const boardRecoil = useRecoilValue(BoardAtom);
  const [key, setKey] = React.useState([params.page_key]);
  const [board, setBoard] = React.useState<IBoard | undefined>(undefined);
  const contentHTML = React.useRef<HTMLDivElement>(null);
  const getBoard = async () => {
    await axios
      .post("http://192.168.100.90:7000/board/getpage", key)
      .then((resp: any) => {
        setBoard(resp.data);
        if (contentHTML.current) {
          contentHTML.current.innerHTML = resp.data?.content!;
        }
      });
  };
  const handleModifyButton = () => {
    router.push(`/board/write?page_key=${key}`);
  };

  const handleDeleteButton = async () => {
    await axios.post("http://192.168.100.90:7000/board/deleteboard", board);
    router.refresh();
    const title = router.push(
      `/board?title=${boardRecoil.menu_name}&key=${boardRecoil.menu_sub_key}`
    );
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="subtitle2" color="GrayText" marginRight={1}>
              {board?.author}
            </Typography>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Typography variant="subtitle2" color="GrayText" marginLeft={1}>
              {board?.modified_time
                ? board?.modified_time?.split(".")[0]
                : board?.create_time?.split(".")[0]}
            </Typography>
          </Box>
          <Box>
            <ButtonGroup>
              <Button variant="contained" onClick={handleModifyButton}>
                Modify
              </Button>
              <Button
                variant="contained"
                onClick={handleDeleteButton}
                color="error"
              >
                Delete
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Box>
      <Divider></Divider>
      <Box
        sx={{
          padding: "15px",
        }}
        ref={contentHTML}
      ></Box>
    </Paper>
  );
}
