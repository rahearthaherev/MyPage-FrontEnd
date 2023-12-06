"use client";

import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const CalendarScheduler = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateClick = (arg) => {
    setIsModalOpen(true);
    setSelectedDate(arg.dateStr);
  };

  const handleEventClick = (info) => {
    if (info && info.event) {
      setIsModalOpen(true);
      setTitle(info.event.title || '');
      setDescription(info.event.extendedProps.description || '');
      setSelectedDate(info.event.startStr || '');
    }
  };

  const handleAddEvent = () => {
    if (title && selectedDate) {
      setEvents([...events, { title, description, date: selectedDate }]);
      setIsModalOpen(false);
      setTitle('');
      setDescription('');
      setSelectedDate('');
    }
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div style={{ width: '80%', margin: 'auto', display: 'flex' }}>
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
          style={{ width: '100%' }}
        />
      </div>
      <div style={{ width: 300, marginLeft: 20 }}>
        {/* 오른쪽에 추가된 내용 */}
        {isModalOpen && (
          <div>
            <Typography variant="h6" gutterBottom>
              이벤트 상세 정보
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              날짜: {selectedDate}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              제목: {title}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              설명: {description}
            </Typography>
          </div>
        )}
      </div>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            일정 추가
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {selectedDate && `날짜: ${selectedDate}`}
          </Typography>
          <TextField
            autoFocus
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
          <Button onClick={() => setIsModalOpen(false)} color="primary" sx={{ mr: 2 }}>
            취소
          </Button>
          <Button onClick={handleAddEvent} color="primary">
            추가
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default CalendarScheduler;