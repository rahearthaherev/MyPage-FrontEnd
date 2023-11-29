import { Grid, Box, Divider, Tooltip } from "@mui/material";
import * as React from "react";
import { HeadText, Text } from "../custom/customComponent";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { QuickAtom } from "@/app/recoil/atoms";
import { useRecoilValue } from "recoil";

export default function Contact() {
  const contactFocusRef = React.useRef<HTMLInputElement>(null);
  const [copy, setCopy] = React.useState("copy");
  const scrollY = useRecoilValue(QuickAtom);
  const setScrollY = async () => {
    await window.scrollTo({ top: scrollY.position });
  };
  React.useEffect(() => {
    if (window.location.hash === "#Contact" && contactFocusRef.current) {
      setScrollY();
      contactFocusRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  return (
    <>
      {" "}
      <Grid item xs={12} ref={contactFocusRef} sx={{ marginTop: "30px" }}>
        <Divider light />
        <HeadText variant="h6">Contact</HeadText>
        <Box>
          <Text>
            E-mail Address : naverdg@gmail.com
            <Tooltip title={copy} arrow>
              <ContentCopyIcon
                fontSize="small"
                sx={{
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgb(230, 230, 230)",
                    cursor: "pointer",
                  },
                }}
                onClick={(e: any) => {
                  navigator.clipboard.writeText("naverdg@gmail.com");
                  setCopy("copied");
                }}
              />
            </Tooltip>
          </Text>
        </Box>
      </Grid>
    </>
  );
}
