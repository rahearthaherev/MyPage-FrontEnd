import { Grid, Box, Divider, Tooltip } from "@mui/material";
import * as React from "react";
import { HeadText, Text } from "../custom/customComponent";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useRecoilValue } from "recoil";
import { QuickAtom } from "@/app/recoil/atoms";

export default function Contact() {
  const [copy, setCopy] = React.useState("copy");

  return (
    <Grid item xs={12} sx={{ marginBottom: "300px" }}>
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
        <Text>Phone Number : 080 - 7432 - 1915</Text>
      </Box>
    </Grid>
  );
}
