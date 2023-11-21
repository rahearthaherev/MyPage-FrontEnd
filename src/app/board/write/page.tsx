"use client";
import "react-quill/dist/quill.snow.css";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import styled from "styled-components";
import * as React from "react";

const Editor = dynamic(() => import("../../components/board/TextEditor"), {
  ssr: false,
});

export default function writePage() {
  // state
  const [htmlStr, setHtmlStr] = React.useState<string>("");

  // ref
  const viewContainerRef = React.useRef<HTMLDivElement>(null);

  // useEffect
  React.useEffect(() => {
    if (viewContainerRef.current) {
      viewContainerRef.current.innerHTML =
        "<h2>html 코드를 이용하여 만들어지는 View입니다.</h2>";
      viewContainerRef.current.innerHTML += htmlStr;
    }
  }, [htmlStr]);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          width: { lg: "1080px", xs: "100vh" },
          paddingTop: "64px",
        }}
      >
        <EditorContainer>
          <Editor htmlStr={htmlStr} setHtmlStr={setHtmlStr} />
        </EditorContainer>

        <Contents.Container>
          <Contents.HtmlContainer>
            <h2>Editor를 통해 만들어진 html 코드입니다.</h2>
            {htmlStr}
          </Contents.HtmlContainer>

          <Contents.ViewContainer ref={viewContainerRef} />
        </Contents.Container>
      </Box>
    </>
  );
}
// style
const EditorContainer = styled.div`
  width: 800px;
  height: 400px;

  margin: 0 auto;
`;

const Contents = {
  Container: styled.div`
    width: 1200px;

    margin: 0 auto;

    display: flex;
    gap: 40px;

    & > div {
      width: 600px;

      padding: 16px;

      box-sizing: border-box;
    }
  `,

  HtmlContainer: styled.div`
    border: 2px solid orange;
  `,

  ViewContainer: styled.div`
    border: 2px solid olive;

    // quill에서 가운데 정렬을 한 경우
    .ql-align-center {
      text-align: center;
    }

    // quill에서 코드 블럭을 사용한 경우
    .ql-syntax {
      background-color: #23241f;
      color: #f8f8f2;
      border-radius: 3px;
      padding: 5px;
      margin: 0 10px;
    }
  `,
};
/*

      
  
*/
