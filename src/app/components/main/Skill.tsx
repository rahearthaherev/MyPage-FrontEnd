import { Grid, Box, Divider } from "@mui/material";
import * as React from "react";
import { CardBoard, HeadText } from "../custom/customComponent";
import { useRecoilValue } from "recoil";
import { QuickAtom } from "@/app/recoil/atoms";

export default function Skill() {
  const skillFocusRef = React.useRef<HTMLInputElement>(null);
  const scrollY = useRecoilValue(QuickAtom);
  const setScrollY = async () => {
    await window.scrollTo({ top: scrollY.position });
  };
  React.useEffect(() => {
    if (window.location.hash === "#Skill" && skillFocusRef.current) {
      setScrollY();
      skillFocusRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });
  return (
    <>
      <Grid item xs={12} ref={skillFocusRef} sx={{ marginTop: "30px" }}>
        <HeadText variant="h5" textAlign="center" sx={{ margin: "30px" }}>
          Skills
        </HeadText>
        <Box
          sx={{
            borderRadius: 2,
            bgcolor: "background.default",
            display: "grid",
            gridTemplateColumns: { md: "1fr 1fr", xs: "1fr" },
            gap: 2,
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
                gap: "10px",
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
              <CardBoard>Recoil</CardBoard>
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
