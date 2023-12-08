"use client";

import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const EventDetail = ({ selectedDate, title, description, onSave, onClose }) => {
  const [eventTitle, setEventTitle] = useState(title);
  const [eventDescription, setEventDescription] = useState(description);

  const handleSave = () => {
    onSave(eventTitle, eventDescription);
    onClose();
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        padding: 2,
        border: '1px solid #ccc',
        borderRadius: 4,
      }}
    >
      <Typography variant="h6" gutterBottom>
        이벤트 상세 정보
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        날짜: {new Date(selectedDate).toLocaleDateString('ko-KR')}
      </Typography>
      <TextField
        margin="dense"
        label="일정 제목"
        type="text"
        fullWidth
        value={eventTitle}
        onChange={(e) => setEventTitle(e.target.value)}
      />
      <TextField
        margin="dense"
        label="상세 내용"
        type="text"
        fullWidth
        value={eventDescription}
        onChange={(e) => setEventDescription(e.target.value)}
      />
      <Button onClick={handleSave} color="primary">
        일정 추가
      </Button>
      {/* 수정: 모달에 닫기 버튼 추가 */}
      <Button onClick={onClose} color="primary" sx={{ mt: 2 }}>
        닫기
      </Button>
    </Box>
  );
};

const CalendarScheduler = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDateClick = (arg) => {
    console.log('달력 클릭:', arg.dateStr);
    setSelectedDate(arg.dateStr);
    setSelectedEvent(null);
  };

  const handleEventClick = (info) => {
    if (info.event) {
      setSelectedDate(info.event.startStr || '');
      setSelectedEvent(info.event);
    }
  };

  const handleSaveEvent = (title, description) => {
    if (selectedDate) {
      setEvents([...events, { title, description, date: selectedDate }]);
      setSelectedEvent(null);
    }
  };

  return (
    <div style={{ width: '80%', margin: 'auto', display: 'flex' }}>
      <div style={{ flex: 8 }}>
        <h2>캘린더 스케줄러</h2>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          style={{ width: '100%' }}
        />
      </div>
      <div style={{ flex: 2, marginLeft: 20 }}>
        {selectedEvent && (
          <EventDetail
            selectedDate={selectedDate}
            title={selectedEvent.title || ''}
            description={selectedEvent.extendedProps.description || ''}
            onSave={handleSaveEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </div>
    </div>
  );
};

export default CalendarScheduler;
