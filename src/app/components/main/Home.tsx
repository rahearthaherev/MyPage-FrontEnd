import { HeadText, Text } from "../custom/customComponent";
import { Grid } from "@mui/material";
import * as React from "react";
import { useRecoilValue } from "recoil";
import { QuickAtom } from "@/app/recoil/atoms";

export default function Home() {
  const homeFocusRef = React.useRef<HTMLInputElement>(null);
  const scrollY = useRecoilValue(QuickAtom);
  const setScrollY = async () => {
    await window.scrollTo({ top: scrollY.position });
  };
  React.useEffect(() => {
    if (window.location.hash === "#Home" && homeFocusRef.current) {
      setScrollY();
      homeFocusRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  return (
    <>
      <Grid
        item
        sm={3}
        xs={12}
        style={{ textAlign: "center" }}
        ref={homeFocusRef}
      >
        <img
          src="/assets/images/photo.png"
          alt="My Image"
          width="100%"
          height="100%"
          style={{
            border: "1px solid lightgray",
            borderRadius: "50%",
            maxWidth: "150px",
            maxHeight: "150px",
            minWidth: "100px",
            minHeight: "100px",
          }}
        ></img>
      </Grid>
      <Grid item sm={9} xs={12}>
        <HeadText variant="h3" style={{ textAlign: "right" }}>
          Daegyun Jeong
        </HeadText>
        <Text style={{ textAlign: "right" }}>
          - Full stack developer from japan, since 2022
        </Text>
      </Grid>
      <Grid item xs={12}>
        <Text>
          I graduated from computer science in 2022 and started my career in
          earnest. I joined a Japanese SI company and gained practical
          experience in back-end development and servers for large systems.
          <br />
          Since 2024, I've also been interested in the front-end, working on
          personal projects and building my skills as a full-stack developer.
        </Text>
      </Grid>
    </>
  );
}
