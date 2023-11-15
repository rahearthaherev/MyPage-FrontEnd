import { Box, Grid, Typography, styled } from "@mui/material";

const HeadText = styled(Typography)({
  fontFamily: "Playpen Sans, cursive",
  color: "gray",
  margin: "5px",
  "@media (max-width: 500px)": {
    fontSize: "15px",
  },
});

const Text = styled(Typography)({
  fontFamily: "Playpen Sans, cursive",
  color: "gray",
  margin: "5px",
  "@media (max-width: 500px)": {
    fontSize: "10px",
  },
});

export default function Home() {
  return (
    <Box sx={{ width: "100%", backgroundColor: "white", padding: "10px;" }}>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item sm={3} xs={12} style={{ textAlign: "center" }}>
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
            earnest. I joined a Japanese SI company in 2023 and gained practical
            experience in backend development and servers for large systems.
            Since 2024, I've also been interested in the frontend, working on
            personal projects and building my skills as a full-stack developer.
          </Text>
        </Grid>
      </Grid>
    </Box>
  );
}
