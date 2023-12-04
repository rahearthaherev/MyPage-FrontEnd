import * as React from "react";
import styled from "styled-components";
import axios from "axios";
import { ImageActions } from "@xeger/quill-image-actions";
import { ImageFormats } from "@xeger/quill-image-formats";
import ReactQuill, { Quill } from "react-quill";
import { DeltaStatic, RangeStatic } from "quill";
import { Box, Button, InputBase, Paper } from "@mui/material";
import IBoard from "@/app/interfaces/IBoard";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useRecoilValue } from "recoil";
import { BoardAtom } from "@/app/recoil/atoms";

interface IEditor {
  htmlStr: string;
  setHtmlStr: React.Dispatch<React.SetStateAction<string>>;
  buttonHandler: () => void;
}

Quill.register("modules/imageActions", ImageActions);
Quill.register("modules/imageFormats", ImageFormats);

const CustomToolbar = () => (
  <div id="toolbar" style={{ borderTop: "0", borderBottom: "0" }}>
    <span className="ql-formats">
      <select className="ql-size" defaultValue="medium">
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
        <option value="huge">Huge</option>
      </select>
      <select className="ql-font"></select>
    </span>
    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
      <button className="ql-blockquote" />
    </span>
    <span className="ql-formats">
      <select className="ql-color" />
      <select className="ql-background" />
    </span>
    <span className="ql-formats">
      <button className="ql-image" />
    </span>
    <span className="ql-formats">
      <button className="ql-clean" />
    </span>
  </div>
);
const formats = [
  "align",
  "background",
  "blockquote",
  "bold",
  "code-block",
  "color",
  "float",
  "font",
  "header",
  "height",
  "image",
  "italic",
  "link",
  "script",
  "strike",
  "size",
  "underline",
  "width",
];

export default function TextEditor() {
  const [htmlStr, setHtmlStr] = React.useState<string>("");
  const quillRef = React.useRef<ReactQuill>(null);
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
    content: htmlStr,
  });
  // 이미지 업로드 핸들러, modules 설정보다 위에 있어야 정상 적용

  const buttonHandler = async () => {
    const boardSetting: IBoard = {
      board_key: board.board_key,
      title: title,
      create_time: board.create_time!,
      author: "JDG",
      menu_sub_key: board.menu_sub_key,
      content: htmlStr,
    };

    await axios
      .post("http://192.168.100.90:7000/board/submit", boardSetting)
      .then(() => {
        router.push(`/board?title=${listTitle}&key=${key}`);
      });
  };
  const imageHandler = () => {
    // file input 임의 생성
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.onchange = async () => {
      const file = input.files;
      const formData = new FormData();

      if (file) {
        formData.append("multipartFiles", file[0]);
      }

      // file 데이터 담아서 서버에 전달하여 이미지 업로드
      const res = await axios.post(
        "http://192.168.100.90:7000/board/uploadimage",
        formData
      );

      if (quillRef.current) {
        // 현재 Editor 커서 위치에 서버로부터 전달받은 이미지 불러오는 url을 이용하여 이미지 태그 추가
        const index = (
          quillRef.current.getEditor().getSelection() as RangeStatic
        ).index;

        const quillEditor = quillRef.current.getEditor();
        quillEditor.setSelection(index, 1);

        quillEditor.clipboard.dangerouslyPasteHTML(
          index,
          `<img src=${res.data} alt=${"alt text"} />`
        );
      }
    };
  };
  const imagePastedHandler = (node: Node, delta: DeltaStatic): DeltaStatic => {
    if (node instanceof HTMLElement && node.tagName.toUpperCase() === "IMG") {
      const imageSrc = (node as HTMLImageElement).getAttribute("src");

      if (imageSrc) {
        fetch(imageSrc)
          .then((response) => response.blob())
          .then(async (blob) => {
            const formData = new FormData();
            formData.append("multipartFiles", blob, "image.png"); // 'multipartFiles'는 서버에서 해당 이미지를 받을 때 사용될 키

            const res = await axios.post(
              "http://192.168.100.90:7000/board/uploadimage",
              formData
            );

            const range = quillRef.current?.getEditor().getSelection();
            const position = range ? range.index : 0;

            quillRef.current
              ?.getEditor()
              .insertEmbed(position, "image", res.data);
          })
          .catch((error) => {
            console.error("Error fetching the image:", error);
          });
      }
    }
    return delta;
  };

  // useMemo를 사용하지 않고 handler를 등록할 경우 타이핑 할때마다 focus가 벗어남
  const modules = React.useMemo(
    () => ({
      imageActions: {},
      imageFormats: {},
      toolbar: {
        // container에 등록되는 순서대로 tool 배치
        container: "#toolbar",

        // custom 핸들러 설정
        handlers: {
          image: imageHandler, // 이미지 tool 사용에 대한 핸들러 설정
        },
      },
      clipboard: {
        matchers: [
          [
            Node.ELEMENT_NODE,
            (node: Node, delta: DeltaStatic) => imagePastedHandler(node, delta),
          ],
        ],
      },
    }),
    []
  );

  const getPage = async (key: string) => {
    await axios
      .post("http://192.168.100.90:7000/board/getpage", [key])
      .then((resp) => {
        setBoard(resp.data);
        setHtmlStr(resp.data.content);
        setTitle(resp.data.title);
      });
  };
  React.useEffect(() => {
    const key: string = parmas.get("page_key")!;
    if (key) {
      getPage(key);
    }
  }, [parmas]);

  return (
    <Paper>
      <Box border={1} borderTop={0} borderColor="lightgray">
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
      <CustomToolbar />
      <CustomReactQuill
        formats={formats}
        ref={quillRef}
        theme="snow"
        modules={modules}
        value={htmlStr}
        placeholder="내용을 입력하세요."
        onChange={(content, delta, source, editor) =>
          setHtmlStr(editor.getHTML())
        }
      />
    </Paper>
  );
}

// style
const CustomReactQuill = styled(ReactQuill).attrs((props) => ({
  ...props,
}))`
  height: 84vh;
  border: 0px;
`;
