"use client";

import { Box, Grid } from "@mui/material";
import * as React from "react";
import Home from "../components/main/Home";
import Projects from "../components/main/Projects";
import Skill from "../components/main/Skill";
import About from "../components/main/About";
import Contact from "../components/main/Contact";
import { useRecoilValue } from "recoil";
import { QuickAtom } from "../recoil/atoms";

export default function Main() {
  const scrollY = useRecoilValue(QuickAtom);

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "white",
        padding: "10px;",
      }}
    >
      <Grid container alignItems="center" justifyContent="center" spacing={1}>
        <Home />
        <About />
        <Skill />
        <Projects />
        <Contact />
      </Grid>
    </Box>
  );
}
