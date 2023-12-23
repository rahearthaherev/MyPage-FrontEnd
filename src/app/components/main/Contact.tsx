"use Client";

import { Grid, Box, Tooltip } from "@mui/material";
import * as React from "react";
import { HeadText, Text } from "../custom/customComponent";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function Contact() {
  const [copy, setCopy] = React.useState("copy");

  return (
    <Grid item xs={12} sx={{ marginBottom: "300px" }}>
      <HeadText variant="h6">Contact</HeadText>
      <Box>
        <Text>
          E-mail Address : naverdg@gmail.com
          <CopyToClipboard
            text="naverdg@gmail.com"
            onCopy={() => {
              setCopy("copied");
            }}
          >
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
              />
            </Tooltip>
          </CopyToClipboard>
        </Text>
        <Text>Phone Number : 080 - 7432 - 1915</Text>
      </Box>
    </Grid>
  );
}
