"use client";

import { Box, Divider, Grid } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import "../book.css";

export default function bookHistory() {
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
          <Grid item xs={5.9} sx={{ height: "100vh" }}></Grid>
          <Divider orientation="vertical" flexItem />
          <Grid
            item
            xs={5.9}
            sx={{
              height: "100vh",
              width: "100%",
              paddingLeft: "20px",
              paddingTop: "70px",
              alignItems: "center",
            }}
          >
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,listMonth",
              }}
              dateClick={(e) => {
                alert(e.dateStr);
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
