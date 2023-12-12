"use client";

import { Box } from "@mui/material";
import { RecoilRoot } from "recoil";

export default function RecoilRootWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RecoilRoot>
      <Box
        sx={{
          backgroundImage: "linear-gradient(to bottom, #B4D0E5, #FFFFFF)",
        }}
      >
        {children}
      </Box>
    </RecoilRoot>
  );
}
