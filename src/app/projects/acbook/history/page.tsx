"use client";

import * as React from "react";
import { Box, Divider, Grid } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "@/app/css/book.css";
import Calendar from "../calendar";
import HistoryTable from "./table";
import PieGraph from "./pie";

export default function bookHistory() {
  const [category, setCategory] = React.useState("Day");
  const [view, setView] = React.useState("Calendar");
  const handleCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory((event.target as HTMLInputElement).value);
  };
  const handleView = (event: React.ChangeEvent<HTMLInputElement>) => {
    setView((event.target as HTMLInputElement).value);
  };
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
              overflowY: "scroll",
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
            </Box>
            <HistoryTable />
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
                    value="Calendar"
                    control={<Radio />}
                    label="Calendar"
                  />
                  <FormControlLabel
                    value="Graph"
                    control={<Radio />}
                    label="Graph"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            {/* <Calendar /> */}
            <PieGraph />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
