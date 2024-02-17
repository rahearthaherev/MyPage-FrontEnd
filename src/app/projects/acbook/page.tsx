import { Box, Button, Grid } from "@mui/material";
import Link from "next/link";

export default function accountBookMain() {
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          backgroundColor: "white",
          marginRight: "64px",
        }}
      >
        <Grid container>
          <Grid item xs={4}>
            <Button
              variant="text"
              color="primary"
              component={Link}
              href="/projects/acbook/write"
              sx={{
                width: "100%",
                height: "100vh",
                fontSize: "50px",
              }}
            >
              Write
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="text"
              color="secondary"
              component={Link}
              href="/projects/acbook/history"
              sx={{
                width: "100%",
                height: "100vh",
                fontSize: "50px",
              }}
            >
              History
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="text"
              color="error"
              component={Link}
              href="/projects/acbook/setting"
              sx={{
                width: "100%",
                height: "100vh",
                fontSize: "50px",
              }}
            >
              Setting
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
