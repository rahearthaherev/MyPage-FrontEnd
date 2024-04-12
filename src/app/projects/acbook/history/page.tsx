"use client";

import * as React from "react";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import "@/app/css/book.css";
import Calendar from "../calendar";
import HistoryTable from "./table";
import Statistics from "./statistics";
import Asset from "./assets";
import FloatingMenus from "../floatingMenu";
import axios from "axios";
import IAccountBookList from "@/app/interfaces/IAccountBookList";

const CALENDAL = "Calendar";
const STATISTICS = "Statistics";
const Assets = "Assets";

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}年${month}月${day}日`;
}

export default function bookHistory() {
  const [category, setCategory] = React.useState("Day");
  const [view, setView] = React.useState("Assets");
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [yearHistory, setYearHistory] = React.useState<IAccountBookList[]>([]);
  const [monthHistory, setMonthHistory] = React.useState<IAccountBookList[]>(
    []
  );
  const [dateHistory, setDateHistory] = React.useState<IAccountBookList[]>([]);

  const handleCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory((event.target as HTMLInputElement).value);
  };
  const handleView = (event: React.ChangeEvent<HTMLInputElement>) => {
    setView((event.target as HTMLInputElement).value);
  };

  function getYearHistory() {
    axios
      .post(
        process.env.NEXT_PUBLIC_SPRING_SERVER +
          "/projects/acbook/getyearhistory",
        selectedDate
      )
      .then((resp: any) => {
        setYearHistory(resp.data);
      });
  }

  function getMonthHistory() {
    axios
      .post(
        process.env.NEXT_PUBLIC_SPRING_SERVER +
          "/projects/acbook/getmonthhistory",
        selectedDate
      )
      .then((resp: any) => {
        setMonthHistory(resp.data);
      });
  }

  function getDateHistory() {
    axios
      .post(
        process.env.NEXT_PUBLIC_SPRING_SERVER +
          "/projects/acbook/getdatehistory",
        selectedDate
      )
      .then((resp: any) => {
        setDateHistory(resp.data);
      });
  }

  React.useEffect(() => {
    getYearHistory();
    getMonthHistory();
    getDateHistory();
  }, [selectedDate]);
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          backgroundColor: "white",
          marginRight: "64px",
        }}
      >
        <Grid container spacing={0}>
          <Grid
            item
            xs={5.9}
            sx={{
              height: "100vh",
              padding: "15px",
              paddingTop: "0px",
              overflowY: "auto",
            }}
          >
            <Box
              sx={{
                height: "50px",
                padding: "10px",
                display: "flex",
              }}
            >
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={category}
                  onChange={handleCategory}
                >
                  <FormControlLabel
                    value="Day"
                    control={<Radio />}
                    label="Day"
                  />
                  <FormControlLabel
                    value="Month"
                    control={<Radio />}
                    label="Month"
                  />
                  <FormControlLabel
                    value="Year"
                    control={<Radio />}
                    label="Year"
                  />
                </RadioGroup>
              </FormControl>
              <Box
                marginLeft="auto"
                sx={{ lineHeight: "50px", paddingTop: "10px" }}
              >
                <Typography>{formatDate(selectedDate)}</Typography>
              </Box>
            </Box>
            <HistoryTable
              yearHistory={yearHistory}
              monthHistory={monthHistory}
              dateHistory={dateHistory}
              category={category}
            />
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid
            item
            xs={5.9}
            sx={{
              height: "100vh",
              width: "100%",
              paddingLeft: "20px",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                height: "50px",
                padding: "10px",
              }}
            >
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={view}
                  onChange={handleView}
                >
                  <FormControlLabel
                    value="Assets"
                    control={<Radio />}
                    label="Assets"
                  />
                  <FormControlLabel
                    value="Calendar"
                    control={<Radio />}
                    label="Calendar"
                  />
                  <FormControlLabel
                    value="Statistics"
                    control={<Radio />}
                    label="Statistics"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            {view == CALENDAL ? (
              <Calendar date={selectedDate} setSelectedDate={setSelectedDate} />
            ) : (
              <></>
            )}
            {view == STATISTICS ? (
              <Statistics
                yearHistory={yearHistory}
                monthHistory={monthHistory}
                dateHistory={dateHistory}
                category={category}
                date={selectedDate}
              />
            ) : (
              <></>
            )}
            {view == Assets ? (
              <Asset
                date={selectedDate}
                yearHistory={yearHistory}
                monthHistory={monthHistory}
                dateHistory={dateHistory}
              />
            ) : (
              <></>
            )}
            <Box
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <FloatingMenus />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
