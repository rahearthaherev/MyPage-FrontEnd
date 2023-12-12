"use client";

import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const EventDetail = ({ event }) => (
  <Box>
    <Typography variant="h6" gutterBottom>
      이벤트 상세 정보
    </Typography>
    <Typography variant="subtitle1" gutterBottom>
      날짜: {event.startStr ? new Date(event.startStr).toLocaleDateString('ko-KR') : ''}
    </Typography>
    <Typography variant="subtitle1" gutterBottom>
      제목: {event.title || ''}
    </Typography>
    <Typography variant="subtitle1" gutterBottom>
      설명: {event.extendedProps.description || ''}
    </Typography>
  </Box>
);

const CalendarScheduler = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  useEffect(() => {
    console.log('Events after update:', events);
  }, [events]);
  const tmp = React.useRef([]);
 const getUpdatedScheduleList = () => {
  tmp.current.push(events.map((event) =>
          event === selectedEvent
            ? {
                ...event,
                title: title,
                extendedProps: {
                  ...event.extendedProps,
                  description: description,
                },
                start: selectedDate,
              }
            : event
        ));
        console.log(`list : ${tmp.current}`);
        return tmp.current;
 }

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    setTitle('');
    setDescription('');
    setIsModalOpen(true);
    setSelectedEvent(null);
  };

  const handleEventClick = (info) => {
    if (info.event) {
      setTitle(info.event.title || '');
      setDescription(info.event.extendedProps.description || '');
      setSelectedDate(info.event.startStr || '');
      setSelectedEvent(info.event);
      setIsModalOpen(true);
    }
  };

  const handleSaveEvent = () => {
    console.log('Title:', title);
    console.log('Selected Date:', selectedDate);
    console.log('Selected Event:', selectedEvent);
    console.log('Description:', description);

    if (title && selectedDate) {
      let updatedEvents = [];

      if (selectedEvent) {
        updatedEvents = getUpdatedScheduleList();
      } else {
        updatedEvents = [
          ...events,
          {
            title: title,
            extendedProps: {
              description: description,
            },
            start: selectedDate,
          },
        ];
      }

      console.log('Updated Events:', updatedEvents);

      setEvents(updatedEvents);
      setIsModalOpen(false);
      setTitle('');
      setDescription('');
      setSelectedDate('');
      setSelectedEvent(null);
    }
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    maxWidth: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <div style={{ flex: 1 }}>
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
        />
      </div>
      <div style={{ width: 300, marginLeft: 20 }}>
        {isModalOpen && (
          <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <Box sx={modalStyle}>
              {selectedEvent ? (
                <EventDetail event={selectedEvent} />
              ) : (
                <>
                  <Typography variant="h6" gutterBottom>
                    새 이벤트 추가
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    날짜: {new Date(selectedDate).toLocaleDateString('ko-KR')}
                  </Typography>
                </>
              )}
              <TextField
                margin="dense"
                label="일정 제목"
                type="text"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                margin="dense"
                label="상세 내용"
                type="text"
                fullWidth
                value={description}
                onChange={(e) => {
                  console.log('New Description Value:', e.target.value);
                  setDescription(e.target.value);
                }}
              />
              <Button onClick={handleSaveEvent} color="primary">
                일정 {selectedEvent ? '수정' : '추가'}
              </Button>
              <Button onClick={() => setIsModalOpen(false)} color="primary">
                닫기
              </Button>
            </Box>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default CalendarScheduler;
