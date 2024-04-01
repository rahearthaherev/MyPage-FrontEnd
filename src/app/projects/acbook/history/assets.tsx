import { Box, Grid, Paper } from "@mui/material";
import React from "react";

const weekdays = ["日", "月", "火", "水", "木", "金", "土"];

export default function Asset() {
  const date = new Date();
  const [selectedYear, setSelectedYear] = React.useState(date.getFullYear());
  const [selectedMonth, setSelectedMonth] = React.useState(
    String(date.getMonth() + 1).padStart(2, "0")
  );
  const [selectedDay, setSelectedDay] = React.useState(
    String(date.getDate()).padStart(2, "0")
  );
  const [year, setYear] = React.useState(date.getFullYear());
  const [month, setMonth] = React.useState(
    String(date.getMonth() + 1).padStart(2, "0")
  );
  const [day, setDay] = React.useState(String(date.getDate()).padStart(2, "0"));
  return (
    <>
      <Box padding="20px">
        <Grid container spacing={2} marginTop="20px">
          <Grid xs={6} item>
            <Paper
              elevation={2}
              component={Box}
              height="250px"
              sx={{ backgroundColor: "rgb(245, 245, 245)" }}
            >
              <Box
                sx={{
                  height: "50px",
                }}
              >
                <Grid container>
                  <Grid
                    xs={4}
                    item
                    lineHeight="50px"
                    paddingLeft="15px"
                    color="red"
                  >
                    月別
                  </Grid>
                  <Grid
                    xs={4}
                    item
                    textAlign="center"
                    lineHeight="50px"
                    fontWeight={700}
                  >
                    {selectedYear}.{selectedMonth}
                  </Grid>
                  <Grid
                    xs={4}
                    item
                    textAlign="right"
                    lineHeight="50px"
                    paddingRight="15px"
                  >
                    {selectedYear == year && selectedMonth == month
                      ? "今月"
                      : ""}
                  </Grid>
                </Grid>
              </Box>
              <Box
                sx={{
                  height: "200px",
                  backgroundColor: "white",
                }}
              >
                <Grid container>
                  <Grid item xs={6}></Grid>
                  <Grid item xs={6}></Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
          <Grid xs={6} item>
            <Paper
              elevation={2}
              component={Box}
              height="250px"
              sx={{ backgroundColor: "rgb(245, 245, 245)" }}
            >
              <Box
                sx={{
                  height: "50px",
                }}
              >
                <Grid container>
                  <Grid
                    xs={4}
                    item
                    lineHeight="50px"
                    paddingLeft="15px"
                    color="red"
                  >
                    日別
                  </Grid>
                  <Grid
                    xs={4}
                    item
                    textAlign="center"
                    lineHeight="50px"
                    fontWeight={700}
                  >
                    {selectedYear}.{selectedMonth}.{selectedDay}(
                    {weekdays[date.getDay()]})
                  </Grid>
                  <Grid
                    xs={4}
                    item
                    textAlign="right"
                    lineHeight="50px"
                    paddingRight="15px"
                  >
                    {selectedDay == day ? "今日" : ""}
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ height: "200px", backgroundColor: "white" }}></Box>
            </Paper>
          </Grid>
          <Grid xs={12} item>
            <Paper elevation={2} component={Box} height="200px">
              <Grid container height="100%">
                <Grid
                  item
                  xs={2}
                  sx={{
                    backgroundColor: "rgb(245, 245, 245)",
                  }}
                  textAlign="center"
                  lineHeight="99px"
                  fontWeight={700}
                  fontSize="20px"
                  color="gray"
                >
                  総額
                </Grid>
                <Grid
                  item
                  xs={4}
                  textAlign="right"
                  lineHeight="99px"
                  paddingRight="15px"
                  fontWeight={700}
                >
                  円
                </Grid>
                <Grid
                  item
                  xs={2}
                  sx={{ backgroundColor: "rgb(245, 245, 245)" }}
                  textAlign="center"
                  lineHeight="99px"
                  fontWeight={700}
                  fontSize="15px"
                  color="gray"
                >
                  クレジット
                </Grid>
                <Grid
                  item
                  xs={4}
                  textAlign="right"
                  lineHeight="99px"
                  paddingRight="15px"
                  fontWeight={700}
                >
                  円
                </Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    backgroundColor: "rgb(245, 245, 245)",
                    borderTop: "1px solid lightgrey",
                  }}
                  textAlign="center"
                  lineHeight="99px"
                  fontWeight={700}
                  fontSize="20px"
                  color="gray"
                >
                  現金
                </Grid>
                <Grid
                  item
                  xs={4}
                  textAlign="right"
                  lineHeight="99px"
                  paddingRight="15px"
                  fontWeight={700}
                  borderTop="1px solid lightgrey"
                >
                  円
                </Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    backgroundColor: "rgb(245, 245, 245)",
                    borderTop: "1px solid lightgrey",
                  }}
                  textAlign="center"
                  lineHeight="99px"
                  fontWeight={700}
                  fontSize="20px"
                  color="gray"
                >
                  通帳
                </Grid>
                <Grid
                  item
                  xs={4}
                  textAlign="right"
                  lineHeight="99px"
                  paddingRight="15px"
                  fontWeight={700}
                  borderTop="1px solid lightgrey"
                >
                  円
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
