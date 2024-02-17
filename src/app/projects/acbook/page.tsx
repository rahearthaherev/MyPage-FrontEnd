import { Box, Button, Grid, Typography } from "@mui/material";

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
