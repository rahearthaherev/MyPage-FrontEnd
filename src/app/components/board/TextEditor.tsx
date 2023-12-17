"use client";

import * as React from "react";
import axios from "axios";

import { Editor as TextEditor } from "@tinymce/tinymce-react";
import { Box, Button, InputBase } from "@mui/material";
import IBoard from "@/app/interfaces/IBoard";
import { useRouter, useSearchParams } from "next/navigation";
import IMenuItem from "@/app/interfaces/IMenuItem";

const Editor = () => {
  const [title, setTitle] = React.useState<string>("");
  const [value, setValue] = React.useState<string>("");
  const router = useRouter();
  const parmas = useSearchParams();
  const uParams = useSearchParams();

  const props: IMenuItem = React.useMemo(
    () => ({
      menu_name: uParams.get("title")!,
      menu_sub_key: uParams.get("key")!,
    }),
    [uParams]
  );

  const [board, setBoard] = React.useState<IBoard>({
    board_key: parmas.get("page_key")!,
    title: title,
    author: "JDG",
    menu_sub_key: props.menu_sub_key!,
    content: value,
  });

  const getPage = async (key: string) => {
    await axios
      .post(process.env.NEXT_PUBLIC_SPRING_SERVER + "/board/getpage", [key])
      .then((resp) => {
        setBoard(resp.data);
        setValue(resp.data.content);
        setTitle(resp.data.title);
      });
  };

  const buttonHandler = async () => {
    const boardSetting: IBoard = {
      board_key: board.board_key,
      title: title,
      create_time: board.create_time!,
      author: "JDG",
      menu_sub_key: board.menu_sub_key,
      content: value,
    };
    console.log(boardSetting);

    await axios
      .post(
        process.env.NEXT_PUBLIC_SPRING_SERVER + "/board/submit",
        boardSetting
      )
      .then((resp) => {
        const result: IBoard = resp.data;
        console.log(result);
        router.push(
          `/board/${result.board_key}?title=${props.menu_name}&key=${props.menu_sub_key}`
        );
      });
  };

  React.useEffect(() => {
    const key: string = parmas.get("page_key")!;
    if (key) {
      getPage(key);
    }
  }, [parmas]);

  return (
    <>
      <Box>
        <InputBase
          placeholder="제목을 입력하세요."
          sx={{ height: "45px", padding: "15px", width: "90%" }}
          value={title}
          onChange={(e: any) => {
            setTitle(e.target.value);
          }}
        ></InputBase>
        <Button
          variant="contained"
          color="warning"
          style={{ float: "right", marginTop: "4px" }}
          onClick={buttonHandler}
        >
          Submit
        </Button>
      </Box>
      <style>{`
          .tox-tinymce {
            border : 1px
          }`}</style>
      <TextEditor
        apiKey="z02cdv9608f71uovwru8ob6wiq5r7avhcd8fr67murk3rq4j"
        init={{
          plugins:
            "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
          mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
          ],
          ai_request: (request: any, respondWith: any) =>
            respondWith.string(() =>
              Promise.reject("See docs to implement AI Assistant")
            ),
          height: "calc(100vh - 150px)",
        }}
        value={value}
        onEditorChange={(newValue, editor) => {
          console.log(newValue);
          setValue(newValue);
        }}
      />
    </>
  );
};

export default Editor;
