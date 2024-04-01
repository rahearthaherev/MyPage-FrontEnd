"use client";

import * as React from "react";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import "@/app/css/book.css";
import Calendar from "../calendar";
import FloatingMenus from "../floatingMenu";
import WriteForm from "./write";

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}年${month}月${day}日`;
}

export default function WriteMain() {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
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
              <Box
                marginLeft="auto"
                sx={{ lineHeight: "50px", paddingTop: "10px" }}
              >
                <Typography fontSize="20px">
                  {formatDate(selectedDate)}
                </Typography>
              </Box>
            </Box>
            <WriteForm date={selectedDate} />
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
            ></Box>
            <Calendar setSelectedDate={setSelectedDate} />
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
