import { Box, Paper, Typography, styled } from "@mui/material";

export const HeadText = styled(Typography)({
  fontFamily: "Playpen Sans, cursive",
  color: "gray",
  margin: "5px",
  "@media (max-width: 500px)": {
    fontSize: "15px",
  },
});

export const Text = styled(Typography)({
  fontFamily: "Playpen Sans, cursive",
  color: "gray",
  margin: "5px",
  "@media (max-width: 500px)": {
    fontSize: "10px",
  },
});

export const ProjectPaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  height: 300,
  maxWidth: "422px",
  padding: "10px",
  lineHeight: "300px",
}));

export const Chip = styled(Typography)({
  fontFamily: "Playpen Sans, cursive",
  minWidth: "60px",
  height: "30px",
  border: "1px solid gray",
  borderRadius: "15px",
  textAlign: "center",
  lineHeight: "25px",
  fontSize: "15px",
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
  padding: "15px",
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
  "@media (max-width: 500px)": {
    fontSize: "10px",
    height: 30,
    lineHeight: "30px",
  },

  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "rgb(230, 230, 230)",
    cursor: "pointer",
  },
});
