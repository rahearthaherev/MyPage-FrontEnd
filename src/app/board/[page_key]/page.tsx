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
import styled from "styled-components";
import { Editor } from "@tinymce/tinymce-react";

export default function BoardPage() {
  const [open, setOpen] = React.useState(false);
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
  const contentHTML = React.useRef<HTMLDivElement>(null);

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
    const title = router.push(
      `/board?title=${props.menu_name}&key=${props.menu_sub_key}`
    );
  };

  useEffect(() => {
    getBoard();
  }, []);

  useEffect(() => {
    if (contentHTML.current) {
      contentHTML.current.innerHTML = board?.content!;
    }
  }, [board]);

  return (
    <Box
      sx={{
        width: { lg: "1080px", xs: "100vh" },
        paddingTop: "64px",
      }}
    >
      <Box
        sx={{
          padding: "15px",
          backgroundColor: "white",
          border: "1px solid lightgrey",
          borderBottom: "none",
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
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
          padding: "0px",
          backgroundColor: "rgb(250, 250, 250)",
        }}
      >
        <style>{`
          .tox-tinymce {
            border : 1px solid lightgrey;
            border-radius: 0px;
          }`}</style>
        <Editor
          apiKey="z02cdv9608f71uovwru8ob6wiq5r7avhcd8fr67murk3rq4j"
          initialValue={board?.content}
          init={{
            readonly: true,
            menubar: false,
            toolbar: false,
            min_height: 650,
          }}
        />
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

const Content = styled.div`
  padding: 15px;
`;
