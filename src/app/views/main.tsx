"use client";

import { Box } from "@mui/material";
import * as React from "react";
import Home from "../components/main/Home";
import Projects from "../components/main/Projects";
import Skill from "../components/main/Skill";
import About from "../components/main/About";
import Contact from "../components/main/Contact";
import { ViewBox } from "../components/custom/customComponent";

export default function Main() {
  const scrollBox = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const wheelHandler = (e: any) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = scrollBox.current!; // 스크롤 위쪽 끝부분 위치
      const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.

      if (deltaY > 0) {
        if (scrollTop >= 0 && scrollTop + 100 < pageHeight) {
          scrollBox.current?.scrollTo({
            top: pageHeight,
            left: 0,
            behavior: "smooth",
          });
        } else if (
          scrollTop >= pageHeight &&
          scrollTop + 100 < pageHeight * 2
        ) {
          scrollBox.current?.scrollTo({
            top: pageHeight * 2,
            left: 0,
            behavior: "smooth",
          });
        } else if (
          scrollTop >= pageHeight &&
          scrollTop + 100 < pageHeight * 3
        ) {
          scrollBox.current?.scrollTo({
            top: pageHeight * 3,
            left: 0,
            behavior: "smooth",
          });
        } else {
          scrollBox.current?.scrollTo({
            top: pageHeight * 4,
            left: 0,
            behavior: "smooth",
          });
        }
      } else {
        if (scrollTop >= 0 && scrollTop - 100 < pageHeight) {
          scrollBox.current?.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else if (
          scrollTop >= pageHeight &&
          scrollTop - 100 < pageHeight * 2
        ) {
          scrollBox.current?.scrollTo({
            top: pageHeight * 1,
            left: 0,
            behavior: "smooth",
          });
        } else if (
          scrollTop >= pageHeight &&
          scrollTop - 100 < pageHeight * 3
        ) {
          scrollBox.current?.scrollTo({
            top: pageHeight * 2,
            left: 0,
            behavior: "smooth",
          });
        } else {
          scrollBox.current?.scrollTo({
            top: pageHeight * 3,
            left: 0,
            behavior: "smooth",
          });
        }
      }
    };

    const scrollBoxRefCurrent = scrollBox.current;
    scrollBoxRefCurrent?.addEventListener("wheel", wheelHandler);
    return () => {
      scrollBoxRefCurrent?.removeEventListener("wheel", wheelHandler);
    };
  }, []);

  React.useEffect(() => {
    const pageHeight = window.innerHeight;
    if (window.location.hash === "#Home") {
      scrollBox.current?.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } else if (window.location.hash === "#About") {
      scrollBox.current?.scrollTo({
        top: pageHeight * 1,
        left: 0,
        behavior: "smooth",
      });
    } else if (window.location.hash === "#Skill") {
      scrollBox.current?.scrollTo({
        top: pageHeight * 2,
        left: 0,
        behavior: "smooth",
      });
    } else if (window.location.hash === "#Projects") {
      scrollBox.current?.scrollTo({
        top: pageHeight * 3,
        left: 0,
        behavior: "smooth",
      });
    } else if (window.location.hash === "#Contact") {
      scrollBox.current?.scrollTo({
        top: pageHeight * 4,
        left: 0,
        behavior: "smooth",
      });
    }
  });

  return (
    <>
      <style>
        {`
          .scrollBox{
            width: 100%;
            justify-content: center;
            align-items: center;
            height: calc(100vh - 64px);
            overflow: auto;
            scrollbar-width: none; /* Firefox용 스크롤바 숨김 */
            -ms-overflow-style: none; /* IE/Edge용 스크롤바 숨김 */
          }
          .scrollBox::-webkit-scrollbar {
            display: none; /* Webkit 기반 브라우저용 스크롤바 숨김 */
          }
        `}
      </style>
      <Box className="scrollBox" ref={scrollBox}>
        <ViewBox>
          <Home />
        </ViewBox>
        <Box></Box>
        <ViewBox>
          <About />
        </ViewBox>
        <ViewBox>
          <Skill />
        </ViewBox>
        <ViewBox>
          <Projects />
        </ViewBox>
        <ViewBox>
          <Contact />
        </ViewBox>
      </Box>
    </>
  );
}
