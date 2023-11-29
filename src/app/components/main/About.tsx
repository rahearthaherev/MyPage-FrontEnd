import { QuickAtom } from "@/app/recoil/atoms";
import { Grid, Box, Divider } from "@mui/material";
import * as React from "react";
import { useRecoilValue } from "recoil";

export default function About() {
  const aboutFocusRef = React.useRef<HTMLInputElement>(null);
  const scrollY = useRecoilValue(QuickAtom);
  const setScrollY = async () => {
    await window.scrollTo({ top: scrollY.position });
  };
  React.useEffect(() => {
    if (window.location.hash === "#About" && aboutFocusRef.current) {
      setScrollY();
      aboutFocusRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  return (
    <>
      <Grid item xs={12} ref={aboutFocusRef} sx={{ marginTop: "30px" }}></Grid>
    </>
  );
}
