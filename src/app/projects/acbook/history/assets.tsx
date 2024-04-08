import IAccountBookItem from "@/app/interfaces/IAccountBookItem";
import IAccountBookList from "@/app/interfaces/IAccountBookList";
import { Box, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import React from "react";

const weekdays = ["日", "月", "火", "水", "木", "金", "土"];

function calAssets(history: IAccountBookList[]) {
  let result: { pay: number; get: number; save: number; balance: number } = {
    pay: 0,
    get: 0,
    save: 0,
    balance: 0,
  };
  history.map((detail, index) => {
    if (detail.type == "支出") {
      result.pay += detail.amount!;
    } else if (detail.type == "輸入") {
      result.get += detail.amount!;
    } else if (detail.type == "貯金") {
      result.save += detail.amount!;
    } else {
      result.balance += detail.amount!;
    }
  });
  return result;
}

export default function Asset(props: {
  date: Date;
  yearHistory: IAccountBookList[];
  monthHistory: IAccountBookList[];
  dateHistory: IAccountBookList[];
}) {
  const date = props.date;
  const [total, setTotal] = React.useState(0);
  const [credit, setCredit] = React.useState(0);
  const [cash, setCash] = React.useState(0);
  const [account, setAccount] = React.useState(0);
  const [selectedYear, setSelectedYear] = React.useState(date.getFullYear());
  const [selectedMonth, setSelectedMonth] = React.useState(
    String(date.getMonth() + 1).padStart(2, "0")
  );
  const [selectedDay, setSelectedDay] = React.useState(
    String(date.getDate()).padStart(2, "0")
  );
  const [yearAsset, setYearAsset] = React.useState<{
    pay: number;
    get: number;
    save: number;
    balance: number;
  }>();
  const [monthAsset, setMonthAsset] = React.useState<{
    pay: number;
    get: number;
    save: number;
    balance: number;
  }>();
  const [dateAsset, setDateAsset] = React.useState<{
    pay: number;
    get: number;
    save: number;
    balance: number;
  }>();

  const [year, setYear] = React.useState(date.getFullYear());
  const [month, setMonth] = React.useState(
    String(date.getMonth() + 1).padStart(2, "0")
  );

  React.useEffect(() => {
    setYearAsset(calAssets(props.yearHistory));
    setMonthAsset(calAssets(props.monthHistory));
    setDateAsset(calAssets(props.dateHistory));
    axios
      .get(process.env.NEXT_PUBLIC_SPRING_SERVER + "/projects/acbook/gettotal")
      .then((resp: any) => {
        setTotal(resp.data);
      });
    axios
      .get(process.env.NEXT_PUBLIC_SPRING_SERVER + "/projects/acbook/getcredit")
      .then((resp: any) => {
        setCredit(resp.data);
      });
    axios
      .get(process.env.NEXT_PUBLIC_SPRING_SERVER + "/projects/acbook/getcash")
      .then((resp: any) => {
        setCash(resp.data);
      });
    axios
      .get(
        process.env.NEXT_PUBLIC_SPRING_SERVER + "/projects/acbook/getaccount"
      )
      .then((resp: any) => {
        setAccount(resp.data);
      });
  }, []);
  return (
    <>
      <Box padding="20px">
        <Grid container spacing={2} marginTop="20px">
          <Grid xs={4} item>
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
                    年別
                  </Grid>
                  <Grid
                    xs={4}
                    item
                    textAlign="center"
                    lineHeight="50px"
                    fontWeight={700}
                  >
                    {selectedYear}年
                  </Grid>
                  <Grid
                    xs={4}
                    item
                    textAlign="right"
                    lineHeight="50px"
                    paddingRight="15px"
                  >
                    当年
                  </Grid>
                </Grid>
              </Box>
              <Box
                paddingLeft="15px"
                sx={{
                  height: "200px",
                  backgroundColor: "white",
                }}
              >
                <Grid container height="100%">
                  <Grid item xs={3} height="25%">
                    <Typography
                      fontSize="15px"
                      fontWeight="700"
                      lineHeight="50px"
                    >
                      支出
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography
                      fontSize="14px"
                      lineHeight="50px"
                      textAlign="right"
                      paddingRight="15px"
                    >
                      {yearAsset?.pay}円
                    </Typography>
                  </Grid>
                  <Grid item xs={3} height="25%">
                    <Typography
                      fontSize="15px"
                      fontWeight="700"
                      lineHeight="50px"
                    >
                      輸入
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography
                      fontSize="14px"
                      lineHeight="50px"
                      textAlign="right"
                      paddingRight="15px"
                    >
                      {yearAsset?.get}円
                    </Typography>
                  </Grid>
                  <Grid item xs={3} height="25%">
                    <Typography
                      fontSize="15px"
                      fontWeight="700"
                      lineHeight="50px"
                    >
                      貯金
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography
                      fontSize="14px"
                      lineHeight="50px"
                      textAlign="right"
                      paddingRight="15px"
                    >
                      {yearAsset?.save}円
                    </Typography>
                  </Grid>
                  <Grid item xs={3} height="25%">
                    <Typography
                      fontSize="15px"
                      fontWeight="700"
                      lineHeight="50px"
                    >
                      残額
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography
                      fontSize="14px"
                      lineHeight="50px"
                      textAlign="right"
                      paddingRight="15px"
                    >
                      {yearAsset?.balance}円
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
          <Grid xs={4} item>
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
                    {selectedMonth}月
                  </Grid>
                  <Grid
                    xs={4}
                    item
                    textAlign="right"
                    lineHeight="50px"
                    paddingRight="15px"
                  >
                    当月
                  </Grid>
                </Grid>
              </Box>
              <Box
                paddingLeft="15px"
                sx={{
                  height: "200px",
                  backgroundColor: "white",
                }}
              >
                <Grid container height="100%">
                  <Grid item xs={3} height="25%">
                    <Typography
                      fontSize="15px"
                      fontWeight="700"
                      lineHeight="50px"
                    >
                      支出
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography
                      fontSize="14px"
                      lineHeight="50px"
                      textAlign="right"
                      paddingRight="15px"
                    >
                      {monthAsset?.pay}円
                    </Typography>
                  </Grid>
                  <Grid item xs={3} height="25%">
                    <Typography
                      fontSize="15px"
                      fontWeight="700"
                      lineHeight="50px"
                    >
                      輸入
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography
                      fontSize="14px"
                      lineHeight="50px"
                      textAlign="right"
                      paddingRight="15px"
                    >
                      {monthAsset?.get}円
                    </Typography>
                  </Grid>
                  <Grid item xs={3} height="25%">
                    <Typography
                      fontSize="15px"
                      fontWeight="700"
                      lineHeight="50px"
                    >
                      貯金
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography
                      fontSize="14px"
                      lineHeight="50px"
                      textAlign="right"
                      paddingRight="15px"
                    >
                      {monthAsset?.save}円
                    </Typography>
                  </Grid>
                  <Grid item xs={3} height="25%">
                    <Typography
                      fontSize="15px"
                      fontWeight="700"
                      lineHeight="50px"
                    >
                      残額
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography
                      fontSize="14px"
                      lineHeight="50px"
                      textAlign="right"
                      paddingRight="15px"
                    >
                      {monthAsset?.balance}円
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
          <Grid xs={4} item>
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
                    {selectedDay}日(
                    {weekdays[date.getDay()]})
                  </Grid>
                  <Grid
                    xs={4}
                    item
                    textAlign="right"
                    lineHeight="50px"
                    paddingRight="15px"
                  >
                    当日
                  </Grid>
                </Grid>
              </Box>
              <Box
                sx={{ height: "200px", backgroundColor: "white" }}
                paddingLeft="15px"
              >
                <Grid container height="100%">
                  <Grid item xs={3} height="25%">
                    <Typography
                      fontSize="15px"
                      fontWeight="700"
                      lineHeight="50px"
                    >
                      支出
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography
                      fontSize="14px"
                      lineHeight="50px"
                      textAlign="right"
                      paddingRight="15px"
                    >
                      {dateAsset?.pay}円
                    </Typography>
                  </Grid>
                  <Grid item xs={3} height="25%">
                    <Typography
                      fontSize="15px"
                      fontWeight="700"
                      lineHeight="50px"
                    >
                      輸入
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography
                      fontSize="14px"
                      lineHeight="50px"
                      textAlign="right"
                      paddingRight="15px"
                    >
                      {dateAsset?.get}円
                    </Typography>
                  </Grid>
                  <Grid item xs={3} height="25%">
                    <Typography
                      fontSize="15px"
                      fontWeight="700"
                      lineHeight="50px"
                    >
                      貯金
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography
                      fontSize="14px"
                      lineHeight="50px"
                      textAlign="right"
                      paddingRight="15px"
                    >
                      {dateAsset?.save}円
                    </Typography>
                  </Grid>
                  <Grid item xs={3} height="25%">
                    <Typography
                      fontSize="15px"
                      fontWeight="700"
                      lineHeight="50px"
                    >
                      残額
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography
                      fontSize="14px"
                      lineHeight="50px"
                      textAlign="right"
                      paddingRight="15px"
                    >
                      {dateAsset?.balance}円
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
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
                  {total}円
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
                  {credit}円
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
                  {cash}円
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
                  {account}円
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
