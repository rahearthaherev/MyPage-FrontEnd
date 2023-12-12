import { Grid, Box } from "@mui/material";
import * as React from "react";
import { CardBoard, HeadText } from "../custom/customComponent";

export default function Skill() {
  return (
    <>
      <Grid item xs={12} sx={{ marginBottom: "180px" }}>
        <HeadText variant="h5" textAlign="center" sx={{ marginBottom: "30px" }}>
          Skills
        </HeadText>
        <Box
          sx={{
            borderRadius: 2,
            display: "grid",
            bgcolor: "white",
            gridTemplateColumns: { md: "1fr 1fr", xs: "1fr" },
            gap: 2,
            padding: "30px",
            border: "2px solid lightgrey",
          }}
        >
          <Box>
            <HeadText variant="h6" textAlign="center">
              Major
            </HeadText>
            <Box
              display="flex"
              flexWrap="wrap"
              sx={{
                gap: "15px",
                borderRight: "1px solid lightgray",
                "@media (max-width: 500px)": {
                  borderRight: "0px solid lightgray",
                },
              }}
            >
              <CardBoard>Node.js</CardBoard>
              <CardBoard>React</CardBoard>
              <CardBoard>Javascript</CardBoard>
              <CardBoard>Typescript</CardBoard>
              <CardBoard>Next.js</CardBoard>
              <CardBoard>Material UI</CardBoard>
              <CardBoard>Recoil</CardBoard>
              <CardBoard>Java</CardBoard>
              <CardBoard>SpringBoot</CardBoard>
              <CardBoard>MS-SQL</CardBoard>
              <CardBoard>PostgreSQL</CardBoard>
            </Box>
          </Box>
          <Box>
            <HeadText variant="h6" textAlign="center">
              Available
            </HeadText>
            <Box display="flex" flexWrap="wrap" sx={{ gap: "10px" }}>
              <CardBoard>C#</CardBoard>
              <CardBoard>Python</CardBoard>
              <CardBoard>.Net Framework</CardBoard>
              <CardBoard>VB</CardBoard>
              <CardBoard>JP1</CardBoard>
              <CardBoard>Excel</CardBoard>
              <CardBoard>Linux</CardBoard>
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  );
}
