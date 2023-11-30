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
import { ViewBox } from "../components/custom/customComponent";

export default function Main() {
  const homeFocusRef = React.useRef<HTMLInputElement>(null);
  const skillFocusRef = React.useRef<HTMLInputElement>(null);
  const aboutFocusRef = React.useRef<HTMLInputElement>(null);
  const contactFocusRef = React.useRef<HTMLInputElement>(null);
  const projectsFocusRef = React.useRef<HTMLInputElement>(null);

  const scrollY = useRecoilValue(QuickAtom);
  const setScrollY = async () => {
    await window.scrollTo({ top: scrollY.position });
  };
  React.useEffect(() => {
    if (window.location.hash === "#Home" && homeFocusRef.current) {
      setScrollY();
      homeFocusRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (window.location.hash === "#Skill" && skillFocusRef.current) {
      setScrollY();
      skillFocusRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (
      window.location.hash === "#Projects" &&
      projectsFocusRef.current
    ) {
      setScrollY();
      projectsFocusRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (window.location.hash === "#About" && aboutFocusRef.current) {
      setScrollY();
      aboutFocusRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (window.location.hash === "#Contact" && contactFocusRef.current) {
      setScrollY();
      contactFocusRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "white",
        padding: "10px;",
      }}
    >
      <Grid container alignItems="center" justifyContent="center" spacing={1}>
        <ViewBox ref={homeFocusRef}>
          <Home />
        </ViewBox>
        <ViewBox ref={aboutFocusRef}>
          <About />
        </ViewBox>
        <ViewBox ref={skillFocusRef}>
          <Skill />
        </ViewBox>
        <ViewBox ref={projectsFocusRef}>
          <Projects />
        </ViewBox>
        <ViewBox ref={contactFocusRef}>
          <Contact />
        </ViewBox>
      </Grid>
    </Box>
  );
}
