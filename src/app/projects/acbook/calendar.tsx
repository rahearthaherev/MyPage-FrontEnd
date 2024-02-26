import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box } from "@mui/material";

export default function Calendar(props: {
  setSelectedDate: (date: Date) => void;
}) {
  const events = [
    { title: "3548円", date: "2024-02-16", content: "test1" },
    { title: "-1244円", date: "2024-02-16", content: "test2" },
  ];
  return (
    <Box sx={{ zIndex: 1 }}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable
        headerToolbar={{
          right: "prev,next today",
        }}
        dateClick={(e) => {
          props.setSelectedDate(e.date);
        }}
        events={events}
        titleFormat={{
          year: "numeric",
          month: "short",
        }}
      />
    </Box>
  );
}
