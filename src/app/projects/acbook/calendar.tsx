import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function Calendar() {
  const events = [
    { title: "3548円", date: "2024-02-16", content: "test1" },
    { title: "-1244円", date: "2024-02-16", content: "test2" },
  ];
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          right: "prev,next today",
        }}
        dateClick={(e) => {
          alert(e.dateStr);
        }}
        events={events}
      />
    </>
  );
}
