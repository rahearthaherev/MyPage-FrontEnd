import * as React from "react";
import axios from "axios";
import { Box, Button, InputBase, Paper } from "@mui/material";
import IBoard from "@/app/interfaces/IBoard";
import { useRouter, useSearchParams } from "next/navigation";
import { useRecoilValue } from "recoil";
import { BoardAtom } from "@/app/recoil/atoms";
import { Editor } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

export default function TextEditor() {
  const htmlStr = React.useRef<any>("");
  const [title, setTitle] = React.useState<string>("");

  const router = useRouter();
  const boardRecoil = useRecoilValue(BoardAtom);
  const parmas = useSearchParams();
  const listTitle = boardRecoil.menu_name;
  const key = boardRecoil.menu_sub_key;

  const [board, setBoard] = React.useState<IBoard>({
    board_key: parmas.get("page_key")!,
    title: title,
    author: "JDG",
    menu_sub_key: key!,
    content: htmlStr.current,
  });

  const setHtmlStr = (html: string) => {
    htmlStr.current.getInstance().setHTML(html);
  };

  const getPage = async (key: string) => {
    await axios
      .post("http://192.168.100.90:7000/board/getpage", [key])
      .then((resp) => {
        setBoard(resp.data);
        setHtmlStr(resp.data.content);
        setTitle(resp.data.title);
      });
  };

  const inputContent = () => {
    const content = htmlStr.current.getInstance().getHTML();
    console.log(content);
  };

  React.useEffect(() => {
    const key: string = parmas.get("page_key")!;
    if (key) {
      getPage(key);
    }
  }, [parmas]);

  return (
    <>
      <Box sx={{ backgroundColor: "white" }}>
        <InputBase
          placeholder="제목을 입력하세요."
          sx={{
            height: "45px",
            padding: "15px",
            borderLeft: "1px solid lightgray",
          }}
          value={title}
          onChange={(e: any) => {
            setTitle(e.target.value);
          }}
        ></InputBase>
        <Button
          variant="contained"
          color="warning"
          style={{ float: "right", marginTop: "4px" }}
          onClick={() => {}}
        >
          Submit
        </Button>
        <Editor
          initialValue={htmlStr.current}
          previewStyle="vertical"
          height="88vh"
          initialEditType="wysiwyg"
          useCommandShortcut={false}
          plugins={[colorSyntax]}
          language="ko-KR"
          ref={htmlStr}
          onChange={inputContent}
          hideModeSwitch={true}
        />
        <Viewer />
      </Box>
    </>
  );
}
