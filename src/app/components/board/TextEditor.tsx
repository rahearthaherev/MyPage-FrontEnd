import * as React from "react";
import styled from "styled-components";
import axios from "axios";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { DeltaStatic, RangeStatic } from "quill";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Box, Button, InputBase, Paper } from "@mui/material";
import IBoard from "@/app/interfaces/IBoard";
import { useRouter, useSearchParams } from "next/navigation";

interface IEditor {
  htmlStr: string;
  setHtmlStr: React.Dispatch<React.SetStateAction<string>>;
  buttonHandler: () => void;
}

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

function Editor() {
  const [htmlStr, setHtmlStr] = React.useState<string>("");
  const [title, setTitle] = React.useState<string>("");
  const quillRef = React.useRef<ReactQuill>(null);
  const router = useRouter();
  const params = useSearchParams();

  // 이미지 업로드 핸들러, modules 설정보다 위에 있어야 정상 적용

  const buttonHandler = async () => {
    const listTitle = params.get("title");
    const key = params.get("key");
    const board: IBoard = {
      title: title,
      author: "JDG",
      menu_sub_key: key!,
      content: htmlStr,
    };
    await axios.post("http://localhost:6974/board/submit", board).then(() => {
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
        "http://localhost:6974/board/uploadimage",
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
              "http://localhost:6974/board/uploadimage",
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
      toolbar: {
        // container에 등록되는 순서대로 tool 배치
        container: "#toolbar",

        // custom 핸들러 설정
        handlers: {
          image: imageHandler, // 이미지 tool 사용에 대한 핸들러 설정
          button: { buttonHandler },
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

  return (
    <Paper>
      <Box border={1} borderTop={0} borderColor="lightgray">
        <InputBase
          placeholder="제목을 입력하세요."
          sx={{ height: "45px", padding: "15px" }}
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

export default Editor;

// style
const CustomReactQuill = styled(ReactQuill)`
  height: 84vh;
  border: 0px;
`;
