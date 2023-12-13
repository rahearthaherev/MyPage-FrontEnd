// import { useEffect, useMemo, useState } from "react";
// import { RichTextEditor } from "@mantine/rte";
// import { Box, Button, InputBase } from "@mui/material";
// import IBoard from "@/app/interfaces/IBoard";
// import { useRouter, useSearchParams } from "next/navigation";
// import axios from "axios";
// import IMenuItem from "@/app/interfaces/IMenuItem";

// const initialValue = "<p></p>";

// const handleImageUpload = (file: File): Promise<string> =>
//   new Promise((resolve, reject) => {
//     const formData = new FormData();
//     formData.append("image", file);

//     fetch(
//       "https://api.imgbb.com/1/upload?key=4f62314faddc3749078d658fb91fdb97",
//       {
//         method: "POST",
//         body: formData,
//       }
//     )
//       .then((response) => response.json())
//       .then((result) => resolve(result.data.url))
//       .catch(() => reject(new Error("Upload failed")));
//   });

// const people = [
//   { id: 1, value: "Bill Horsefighter" },
//   { id: 2, value: "Amanda Hijacker" },
//   { id: 3, value: "Leo Summerhalter" },
//   { id: 4, value: "Jane Sinkspitter" },
// ];

// const tags = [
//   { id: 1, value: "JavaScript" },
//   { id: 2, value: "TypeScript" },
//   { id: 3, value: "Ruby" },
//   { id: 3, value: "Python" },
// ];

// export default function Editor() {
//   const [title, setTitle] = useState<string>("");
//   const [value, onChange] = useState(initialValue);
//   const router = useRouter();
//   const parmas = useSearchParams();
//   const uParams = useSearchParams();

//   const props: IMenuItem = useMemo(
//     () => ({
//       menu_name: uParams.get("title")!,
//       menu_sub_key: uParams.get("key")!,
//     }),
//     [uParams]
//   );

//   const [board, setBoard] = useState<IBoard>({
//     board_key: parmas.get("page_key")!,
//     title: title,
//     author: "JDG",
//     menu_sub_key: props.menu_sub_key!,
//     content: value,
//   });

//   const mentions = useMemo(
//     () => ({
//       allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
//       mentionDenotationChars: ["@", "#"],
//       source: (searchTerm: any, renderList: any, mentionChar: any) => {
//         const list = mentionChar === "@" ? people : tags;
//         const includesSearchTerm = list.filter((item: any) =>
//           item.value.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//         renderList(includesSearchTerm);
//       },
//     }),
//     []
//   );

//   const buttonHandler = async () => {
//     const boardSetting: IBoard = {
//       board_key: board.board_key,
//       title: title,
//       create_time: board.create_time!,
//       author: "JDG",
//       menu_sub_key: board.menu_sub_key,
//       content: value,
//     };
//     console.log(boardSetting);
//     await axios
//       .post(
//         process.env.NEXT_PUBLIC_SPRING_SERVER + "/board/submit",
//         boardSetting
//       )
//       .then((resp) => {
//         const result: IBoard = resp.data;
//         console.log(result);
//         router.push(
//           `/board/${result.board_key}?title=${props.menu_name}&key=${props.menu_sub_key}`
//         );
//       });
//   };

//   const getPage = async (key: string) => {
//     await axios
//       .post(process.env.NEXT_PUBLIC_SPRING_SERVER + "/board/getpage", [key])
//       .then((resp) => {
//         setBoard(resp.data);
//         onChange(resp.data.content);
//         setTitle(resp.data.title);
//       });
//   };
//   useEffect(() => {
//     const key: string = parmas.get("page_key")!;
//     if (key) {
//       getPage(key);
//     }
//   }, [parmas]);

//   return (
//     <>
//       <Box
//         border={1}
//         borderTop={0}
//         borderBottom={0}
//         borderColor="lightgray"
//         sx={{ backgroundColor: "white" }}
//       >
//         <InputBase
//           placeholder="제목을 입력하세요."
//           sx={{ height: "45px", padding: "15px", width: "90%" }}
//           value={title}
//           onChange={(e: any) => {
//             setTitle(e.target.value);
//           }}
//         ></InputBase>
//         <Button
//           variant="contained"
//           color="warning"
//           style={{ float: "right", marginTop: "4px" }}
//           onClick={buttonHandler}
//         >
//           Submit
//         </Button>
//       </Box>
//       <style>
//         {`
//             .ql-editor{
//               min-height: calc(100vh - 165px);
//             }
//           `}
//       </style>
//       <RichTextEditor
//         value={value}
//         onChange={onChange}
//         onImageUpload={handleImageUpload}
//         mentions={mentions}
//       />
//     </>
//   );
// }
