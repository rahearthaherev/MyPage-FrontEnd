import { Grid, Slider, createTheme, ThemeProvider, Paper } from "@mui/material";
import * as React from "react";
import { CardText, HeadText, Text } from "../custom/customComponent";
import { grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: grey,
  },
});

const defalutDescription = (
  <Text>
    株式会社トマトに在職中(2022.09~)
    <br />
    Today&apos;s Styling 個人プロジェクト開発中(2023.11~)
  </Text>
);

const defaultMark = [
  {
    value: 2024,
    label: "現在",
  },
  {
    value: 2022,
    label: "日本のIT会社入社",
  },
  {
    value: 2020,
    label: "コンピュータ工学専攻",
  },
  {
    value: 2018,
    label: "社会服務要員",
  },
  {
    value: 2014,
    label: "経営学部入学",
  },
];

function valuetext(value: number) {
  return `${value}`;
}

export default function About() {
  const [year, setYear] = React.useState(2024);
  const [description, setDescription] = React.useState(defalutDescription);

  React.useEffect(() => {
    if (year >= 2024) {
      setDescription(
        <CardText>
          NTTトコもプロジェクト参加(2023.12~2024.02)
          <br />
          Today&apos;s Styling 個人プロジェクト(2023.11~)
        </CardText>
      );
    } else if (year >= 2023) {
      setDescription(
        <CardText>
          NTTトコもプロジェクト参加(2023.12~2024.02)
          <br />
          Today&apos;s Styling 個人プロジェクト(2023.11~)
        </CardText>
      );
    } else if (year >= 2022) {
      setDescription(
        <CardText>
          AURORA プロジェクト参加(2022.12~2023.11)
          <br />
          Sparrow プロジェクト参加(2022.09~2022.11)
          <br />
          株式会社トマトに入社(2022.09~)
        </CardText>
      );
    } else if (year >= 2021) {
      setDescription(
        <CardText>
          プロジェクト参加(2021.03~2021.08)
          <br />
          Groupware プロジェクト参加(2021.09~2022.08) FaceStamp
        </CardText>
      );
    } else if (year >= 2020) {
      setDescription(
        <CardText>コンピュータ工学複数専攻(2020.03~2022.08)</CardText>
      );
    } else if (year >= 2018) {
      setDescription(<CardText>産業機能要員勤務(2018.03~2020.06)</CardText>);
    } else if (year >= 2014) {
      setDescription(<CardText>経営学部入学(2014.03~2022.08)</CardText>);
    }
  }, [year]);

  return (
    <>
      <Grid item xs={12} sx={{ width: "100%" }}>
        <HeadText variant="h5" textAlign="center" sx={{ marginBottom: "30px" }}>
          About
        </HeadText>
        <ThemeProvider theme={theme}>
          <Grid container>
            <Grid
              item
              md={3}
              xs={12}
              sx={{
                height: 300,
                marginBottom: "10px",
                "@media (max-width: 900px)": {
                  height: 180,
                },
              }}
            >
              <Slider
                aria-label="Always visible"
                value={year}
                getAriaValueText={valuetext}
                step={1}
                marks={defaultMark}
                valueLabelDisplay="on"
                orientation="vertical"
                color="primary"
                min={2014}
                max={2024}
                sx={{
                  marginLeft: "50px",
                  "@media (max-width: 900px)": {
                    height: 200,
                  },
                }}
                onChange={(e, v: any) => {
                  setYear(v);
                }}
              />
            </Grid>
            <Grid item md={9} xs={12}>
              <Paper
                sx={{
                  padding: "25px",
                  marginLeft: "65px",
                  height: 300,
                  "@media (max-width: 900px)": {
                    margin: "0px",
                    fontSize: "15px",
                    height: 180,
                  },
                }}
              >
                {description}
              </Paper>
            </Grid>
          </Grid>
        </ThemeProvider>
      </Grid>
    </>
  );
}
