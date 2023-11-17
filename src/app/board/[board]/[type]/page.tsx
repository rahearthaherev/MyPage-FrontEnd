import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Header from "@/app/components/board/Header";

export default function BoardPage(props: any) {
  return (
    <Box sx={{ display: "flex" }}>
      <Header title={props.params.board} typeId={props.params.type} />
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}
