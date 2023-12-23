import { Box, Paper, Typography, styled } from "@mui/material";

export const HeadText = styled(Typography)({
  fontFamily: "Playpen Sans, cursive",
  color: "grey",
  margin: "5px",
  fontSize: "25px",
  "@media (max-width: 500px)": {
    fontSize: "15px",
  },
});

export const Text = styled(Typography)({
  fontFamily: "Playpen Sans, cursive",
  color: "grey",
  margin: "5px",
  fontSize: "20px",
  "@media (max-width: 500px)": {
    fontSize: "10px",
  },
});

export const SmallText = styled(Typography)({
  fontFamily: "Playpen Sans, cursive",
  color: "grey",
  margin: "5px",
  fontSize: "15px",
  "@media (max-width: 500px)": {
    fontSize: "10px",
  },
});

export const SmallBoldText = styled(Typography)({
  fontFamily: "Playpen Sans, cursive",
  color: "grey",
  margin: "5px",
  fontSize: "15px",
  fontWeight: "bold",
  "@media (max-width: 500px)": {
    fontSize: "10px",
  },
});

export const CardText = styled(Typography)({
  fontFamily: "Playpen Sans, cursive",
  color: "grey",
  margin: "5px",
  fontSize: "15px",
  "@media (max-width: 500px)": {
    fontSize: "10px",
  },
});

export const ProjectPaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  height: 400,
  minWidth: "600px",
  padding: "10px",
  lineHeight: "300px",
}));

export const Chip = styled(Box)({
  fontFamily: "Playpen Sans, cursive",
  minWidth: "60px",
  height: "30px",
  border: "2px solid lightgray",
  borderRadius: "15px",
  textAlign: "center",
  lineHeight: "25px",
  fontSize: "15px",
  color: "grey",
  paddingLeft: "15px",
  paddingRight: "15px",
  "@media (max-width: 500px)": {
    fontSize: "10px",
  },
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "rgb(230, 230, 230)",
    cursor: "pointer",
  },
});

export const SkillBox = styled(Box)({
  padding: "10px",
  paddingTop: 0,
  gap: "10px",
  display: "flex",
  flexWrap: "wrap",
});

export const CardBoard = styled(Typography)({
  fontFamily: "Playpen Sans, cursive",
  minWidth: "80px",
  height: 50,
  border: "1px solid lightgray",
  borderRadius: "15px",
  textAlign: "center",
  lineHeight: "45px",
  fontSize: "20px",
  paddingLeft: "15px",
  paddingRight: "15px",
  color: "gray",
  backgroundColor: "white",
  "@media (max-width: 500px)": {
    fontSize: "10px",
    height: 30,
    lineHeight: "30px",
  },

  transition: "all 0.3s ease-in-out, background-color 0.3s ease",
  "&:hover": {
    transform: "scale(1.1)",
    backgroundColor: "rgb(230, 230, 230)",
    cursor: "pointer",
  },
});

export const ViewBox = styled(Box)({
  width: "100%",
  height: "100vh",
  padding: "0px",
  margin: "0px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  overflowY: "auto",
  overflowX: "hidden",
});
