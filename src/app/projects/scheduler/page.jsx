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

const EventDetail = ({ event, onEdit }) => (
  <Box>
    <Typography variant="h6" gutterBottom>
      이벤트 상세 정보
    </Typography>
    <Typography variant="subtitle1" gutterBottom>
      날짜: {event.startStr ? new Date(event.startStr).toLocaleDateString('ko-KR') : ''}
    </Typography>
    {/* 제목과 설명을 편집 가능한 입력 필드로 변경 */}
    <TextField
      margin="dense"
      label="일정 제목"
      type="text"
      fullWidth
      value={event.title || ''}
      // onEdit 함수가 주어지고 수정 가능한 경우에만 읽기 전용 해제
      InputProps={{ readOnly: !onEdit, }}
      onChange={(e) => onEdit && onEdit('title', e.target.value)}
    />
    <TextField
      margin="dense"
      label="상세 내용"
      type="text"
      fullWidth
      value={event.extendedProps?.description || ''}
      // onEdit 함수가 주어지고 수정 가능한 경우에만 읽기 전용 해제
      InputProps={{ readOnly: !onEdit, }}
      onChange={(e) => onEdit && onEdit('description', e.target.value)}
    />
  </Box>
);

const CalendarScheduler = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEdit = (property, value) => {
    if (property === 'title') {
      setTitle(value);
    } else if (property === 'description') {
      setDescription(value);
    }
  };
  
  useEffect(() => {
    const storedEvents = loadEventsFromLocalStorage();
    setEvents(storedEvents);
  }, []);

  const getUpdatedScheduleList = () => {
    return events.map((eventItem) =>
      eventItem === selectedEvent
        ? {
            ...eventItem,
            title: title,
            extendedProps: {
              ...eventItem.extendedProps,
              description: description,
            },
            start: selectedDate,
          }
        : eventItem
    );
  };

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
      setDescription(info.event.extendedProps?.description || '');
      setSelectedDate(info.event.startStr || '');
      setSelectedEvent(info.event);
      setIsModalOpen(true);
    }
  };

  const handleSaveEvent = () => {
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
  
      setEvents(updatedEvents);
      saveEventsToLocalStorage(updatedEvents);
  
      setIsModalOpen(false);
      setTitle('');
      setDescription('');
      setSelectedDate('');
      setSelectedEvent(null);
    }
  };

  const saveEventsToLocalStorage = (updatedEvents) => {
    localStorage.setItem('events', JSON.stringify(updatedEvents));
  };

  const loadEventsFromLocalStorage = () => {
    const storedEvents = localStorage.getItem('events');
    return storedEvents ? JSON.parse(storedEvents) : [];
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    maxWidth: 400,
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    padding: 4,
  };

  return (
    <div style={{ width: '80%', margin: 'auto', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, marginBottom: '20px' }}>
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
          key={events.length}
        />
      </div>
      <div style={{ width: 300, marginLeft: 20 }}>
      {isModalOpen && (
  <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
    <Box sx={modalStyle}>
      {selectedEvent ? (
        <EventDetail event={selectedEvent} onEdit={handleEdit} />
      ) : (
        <>
          <Typography variant="h6" gutterBottom>
            새 이벤트 추가
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            날짜: {new Date(selectedDate).toLocaleDateString('ko-KR')}
          </Typography>
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
            onChange={(e) => setDescription(e.target.value)}
          />
        </>
      )}
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
