"use client";

import { Box } from "@mui/material";
import * as React from "react";
import Home from "../components/main/Home";
import Projects from "../components/main/Projects";
import Skill from "../components/main/Skill";
import About from "../components/main/About";
import Contact from "../components/main/Contact";
import { ViewBox } from "../components/custom/customComponent";
import { useRouter } from "next/navigation";
import "@/app/css/mainStyle.css";

export default function Main() {
  const scrollBox = React.useRef<HTMLElement>(null);
  const router = useRouter();
  React.useEffect(() => {
    const wheelHandler = (e: any) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = scrollBox.current!;
      const pageHeight = window.innerHeight;
      if (deltaY > 0) {
        if (scrollTop >= 0 && scrollTop + 100 < pageHeight) {
          router.push("/#About");
          router.refresh();
        } else if (
          scrollTop >= pageHeight - 10 &&
          scrollTop + 100 < pageHeight * 2
        ) {
          router.push("/#Skill");
          router.refresh();
        } else if (
          scrollTop >= pageHeight - 10 &&
          scrollTop + 100 < pageHeight * 3
        ) {
          router.push("/#Projects");
          router.refresh();
        } else {
          router.push("/#Contact");
          router.refresh();
        }
      } else {
        if (scrollTop >= 0 && scrollTop - 100 < pageHeight) {
          router.push("/#Home");
          router.refresh();
        } else if (
          scrollTop >= pageHeight &&
          scrollTop - 100 < pageHeight * 2
        ) {
          router.push("/#About");
          router.refresh();
        } else if (
          scrollTop >= pageHeight &&
          scrollTop - 100 < pageHeight * 3
        ) {
          router.push("/#Skill");
          router.refresh();
        } else {
          router.push("/#Projects");
          router.refresh();
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
