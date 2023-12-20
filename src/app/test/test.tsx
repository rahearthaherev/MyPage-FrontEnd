import React, { FC, useCallback, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

interface Props {
  onSubmitForm: (e: any) => void;
  chat?: string;
  onChangeChat: (e: any) => void;
  placeholder: string;
}

const EditorChatBox: FC<Props> = ({
  onSubmitForm,
  chat,
  onChangeChat,
  placeholder,
}) => {
  return <Editor />;
};

export default EditorChatBox;
