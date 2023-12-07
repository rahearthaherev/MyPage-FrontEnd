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

  // 수정: 선택된 이벤트 정보 저장
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    setTitle('');
    setDescription('');
    setIsModalOpen(true);
    setSelectedEvent(null); // 수정: 날짜를 클릭할 때 선택된 이벤트 초기화
  };

  const handleEventClick = (info) => {
    if (info.event) {
      setTitle(info.event.title || '');
      setDescription(info.event.extendedProps.description || '');
      setSelectedDate(info.event.startStr || '');

      // 수정: 이벤트를 클릭할 때 선택된 이벤트 정보 저장
      setSelectedEvent(info.event);

      setIsModalOpen(true);
    }
  };

  const handleAddEvent = () => {
    if (title && selectedDate) {
      setEvents([...events, { title, description, date: selectedDate }]);
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
        {selectedEvent && ( // 수정: 선택된 이벤트 정보가 있을 때만 표시
          <Box sx={{ ...modalStyle, width: '100%' }}>
            <Typography variant="h6" gutterBottom>
              이벤트 상세 정보
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              날짜: {new Date(selectedEvent.startStr).toLocaleDateString('ko-KR')}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              제목: {selectedEvent.title || ''}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              설명: {selectedEvent.extendedProps.description || ''}
            </Typography>
            {/* 수정: 모달에 닫기 버튼 추가 */}
            <Button onClick={() => setIsModalOpen(false)} color="primary" sx={{ mt: 2 }}>
              닫기
            </Button>
          </Box>
        )}
        {isModalOpen && (
          <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <Box sx={modalStyle}>
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
              <Button onClick={handleAddEvent} color="primary">
                일정 추가
              </Button>
              {/* 수정: 모달에 닫기 버튼 추가 */}
              <Button onClick={() => setIsModalOpen(false)} color="primary" sx={{ mt: 2 }}>
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