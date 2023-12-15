"use client";

import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Modal, Button, TextField } from '@mui/material';

const Scheduler = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTitle, setEventTitle] = useState('');

  const handleDateClick = (arg) => {
    setSelectedDate(arg.date);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveEvent = () => {
    // 여기에서 이벤트를 추가하는 로직을 구현하면 됩니다.
    console.log('Add event:', eventTitle, 'on date:', selectedDate);
    setEventTitle('');
    setModalOpen(false);
  };

  const events = [
    { title: 'Meeting 1', date: '2023-12-15' },
    { title: 'Meeting 2', date: '2023-12-16' },
  ];

  return (
    <div style={{ width: '80%', margin: 'auto', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, marginBottom: '20px' }}>
        <h2>캘린더 스케줄러</h2>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          events={events}
          dateClick={handleDateClick}
        />
      </div>
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={{ padding: '20px', width: '300px', margin: 'auto' }}>
          <h2 id="modal-modal-title">Add Event</h2>
          <TextField
            label="Event Title"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" onClick={handleSaveEvent} style={{ marginRight: '10px' }}>
            Save
          </Button>
          <Button variant="contained" onClick={handleCloseModal}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Scheduler;