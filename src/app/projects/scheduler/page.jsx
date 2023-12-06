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
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    setIsModalOpen(true);
  };

  const handleEventClick = (info) => {
    if (info && info.event) {
      setTitle(info.event.title || '');
      setDescription(info.event.extendedProps.description || '');
      setSelectedDate(info.event.startStr || '');
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
          <Modal open={isModalOpen} onClose={handleCloseModal}>
            <Box sx={{ ...modalStyle, width: '100%' }}>
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
              <Button onClick={handleCloseModal} color="primary" sx={{ mt: 2 }}>
                닫기
              </Button>
            </Box>
          </Modal>
        )}
        {/* 추가된 내용 */}
        <div style={{ marginTop: 20 }}>
          <TextField
            label="일정 제목"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="상세 내용"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            sx={{ mt: 2 }}
          />
          <Button onClick={handleAddEvent} color="primary" sx={{ mt: 2 }}>
            일정 추가
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CalendarScheduler;