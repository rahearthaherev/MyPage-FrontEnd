"use client";

import IBoard from "@/app/interfaces/IBoard";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import IMenuItem from "@/app/interfaces/IMenuItem";
import ConfirmationMessage from "@/app/components/common/ConfirmationMessage";
import "@/app/css/boardStyle.css";

export default function BoardPage() {
  const [open, setOpen] = React.useState(false);
  const htmlStr = React.useRef<HTMLDivElement>(null);
  const params = useParams();
  const router = useRouter();
  const uParams = useSearchParams();
  const [key, setKey] = React.useState([params.page_key]);
  const props: IMenuItem = React.useMemo(
    () => ({
      menu_name: uParams.get("title")!,
      menu_sub_key: uParams.get("key")!,
    }),
    [uParams]
  );

  const [board, setBoard] = React.useState<IBoard | undefined>(undefined);

  const getBoard = async () => {
    await axios
      .post(process.env.NEXT_PUBLIC_SPRING_SERVER + "/board/getpage", key)
      .then((resp: any) => {
        setBoard(resp.data);
      });
  };
  const handleModifyButton = () => {
    router.push(
      `/board/write?page_key=${key}&title=${props.menu_name}&key=${props.menu_sub_key}`
    );
  };

  const handleDeleteButton = async () => {
    await axios.post(
      process.env.NEXT_PUBLIC_SPRING_SERVER + "/board/deleteboard",
      board
    );
    setOpen(!open);
    router.refresh();
    router.push(`/board?title=${props.menu_name}&key=${props.menu_sub_key}`);
  };

  useEffect(() => {
    getBoard();
  }, []);

  useEffect(() => {
    if (htmlStr.current) {
      htmlStr.current.innerHTML = board?.content!;
      console.log(htmlStr.current.innerHTML);
    }
  }, [board]);
  return (
    <Box
      sx={{
        width: { lg: "1080px", xs: "100vh" },
        paddingTop: "64px",
        marginBottom: "15px",
        border: "1px solid lightgrey",
      }}
    >
      <Box
        sx={{
          padding: "15px",
          backgroundColor: "white",
          borderBottom: "1px solid lightgrey",
          justifyContent: "space-between",
          display: "flex",
        }}
      >
        <Typography variant="h6">{board?.title}</Typography>
        <Box
          sx={{
            display: "flex",

            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginRight: "15px",
            }}
          >
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
                onClick={() => {
                  setOpen(!open);
                }}
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
          backgroundColor: "white",
        }}
      >
        <div ref={htmlStr} style={{ padding: "15px" }}></div>
      </Box>
      <ConfirmationMessage
        open={open}
        setOpen={() => {
          setOpen(!open);
        }}
        func={handleDeleteButton}
      />
    </Box>
  );
}
