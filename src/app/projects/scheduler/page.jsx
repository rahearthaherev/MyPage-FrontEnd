"use client";

import React, { useState, useRef } from 'react';
import { Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';

const CalendarScheduler = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [newEvent, setNewEvent] = useState('');
  const forceUpdate = useRef(0);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log('날짜 선택 확인:', date); // 콘솔에 날짜 선택 로그 출력
  };

  const handleAddEvent = () => {
    if (selectedDate && newEvent) {
      setSchedule([...schedule, { date: selectedDate, event: newEvent }]);
      setNewEvent('');
      forceUpdate.current += 1;
      console.log('일정 추가 확인:', schedule); // 콘솔에 일정 추가 로그 출력
    }
  };

  return (
    <div key={forceUpdate.current}>
      <Typography variant="h4" gutterBottom>
        캘린더 스케줄러
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
        orientation='portrait'
          displayStaticWrapperAs="desktop"
          value={selectedDate}
          onChange={handleDateChange}
          textField={(startProps) => (
            <TextField {...startProps} variant="standard" margin="normal" fullWidth style={{ width: '400px' }} />
          )}
        
        />
        <div style={{ marginTop: '16px' }}>
          <Typography variant="h6" gutterBottom>
            {selectedDate && selectedDate.toDateString ? `선택한 날짜의 일정: ${selectedDate.toDateString()}` : '날짜를 선택하세요'}
          </Typography>
          <List>
            {(selectedDate && schedule.length > 0) ? (
              schedule
                .filter((event) => event.date && typeof event.date.toDateString === 'function' && event.date.toDateString() === (selectedDate?.toDateString() || ''))
                .map((event) => (
                  <ListItem key={event.id}>
                    <ListItemText primary={`${event.date.toLocaleTimeString()}: ${event.event}`} />
                  </ListItem>
                ))
            ) : (
              <ListItem>
                <ListItemText primary="일정이 없습니다." />
              </ListItem>
            )}
          </List>
          <TextField
            label="새로운 일정"
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={handleAddEvent}>
            일정 추가
          </Button>
        </div>
      </LocalizationProvider>
    </div>
  );
};

export default CalendarScheduler;
