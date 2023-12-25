"use client";

import React, { Component } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, Stack, InputLabel } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

class Scheduler extends Component {
  constructor(props) {
    super(props);

    const storedEvents = localStorage.getItem('events');

    this.state = {
      openDialog: false,
      events: storedEvents ? JSON.parse(storedEvents) : [],
      newEvent: { title: '', description: '', start: '', end: '' },
      selectedEvent: null,
      error: null, 
    };
  }

  handleDialogOpen = () => {
    this.setState({ openDialog: true });
  };

  handleDialogClose = () => {
    this.setState({ openDialog: false, selectedEvent: null, error: null }); 
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      newEvent: { ...prevState.newEvent, [name]: value },
    }));
  };

  handleEventAdd = () => {
    const { selectedEvent, newEvent } = this.state;
  
    if (!selectedEvent) {
      const startDate = new Date(newEvent.start);
      const endDate = new Date(newEvent.end);
  
      if (!newEvent.title || !newEvent.start || !newEvent.end || isNaN(startDate) || isNaN(endDate)) {
        this.setState({ error: '제목, 시작일 및 종료일은 필수 입력 사항이며 올바른 날짜 및 시간 형식을 입력하세요.' });
        return;
      }
  
      this.setState(
        (prevState) => ({
          events: [...prevState.events, prevState.newEvent],
          newEvent: { title: '', description: '', start: '', end: '' },
          selectedEvent: null,
          error: null,
        }),
        () => {
          localStorage.setItem('events', JSON.stringify(this.state.events));
          this.handleDialogClose();
        }
      );
    } else {
      this.handleDialogClose();
    }
  };

  handleEventClick = (info) => {
    this.setState({ selectedEvent: info.event, error: null });
    this.handleDialogOpen();
  };

  render() {
    const { openDialog, events, newEvent, selectedEvent, error } = this.state;

    return (
      <div>
        <Stack direction="row" spacing={2} mb={2}>
          <Button variant="contained" onClick={this.handleDialogOpen}>
            일정 추가
          </Button>
        </Stack>

        <Dialog open={openDialog} onClose={this.handleDialogClose}>
          <DialogTitle>일정 {selectedEvent ? '상세 정보' : '추가'}</DialogTitle>
          <DialogContent>
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            {selectedEvent ? (
              <>
                <InputLabel>일정 제목</InputLabel>
                <TextField value={selectedEvent.title} fullWidth margin="normal" disabled />
                <InputLabel>일정 내용</InputLabel>
                <TextField
                  value={selectedEvent.extendedProps.description}
                  fullWidth
                  margin="normal"
                  disabled
                />
                <InputLabel>일정 시작일</InputLabel>
                <TextField value={selectedEvent.startStr} fullWidth margin="normal" disabled />
                <InputLabel>일정 종료일</InputLabel>
                <TextField value={selectedEvent.endStr} fullWidth margin="normal" disabled />
              </>
            ) : (
              <>
                <InputLabel>일정 제목</InputLabel>
                <TextField
                  label="일정 제목을 입력해주세요"
                  name="title"
                  value={newEvent.title}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <InputLabel>일정 내용</InputLabel>
                <TextField
                  label="일정 내용을 입력해주세요"
                  name="description"
                  value={newEvent.description}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <InputLabel>일정 시작일</InputLabel>
                <TextField
                  name="start"
                  type="datetime-local"
                  value={newEvent.start}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <InputLabel>일정 종료일</InputLabel>
                <TextField
                  name="end"
                  type="datetime-local"
                  value={newEvent.end}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                />
              </>
            )}

<Button
  variant="contained"
  onClick={this.handleEventAdd}
  style={{ marginTop: '10px' }} 
>
  {selectedEvent ? '닫기' : '추가'}
</Button>
          </DialogContent>
        </Dialog>

        <div style={{ width: '80%', margin: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, marginBottom: '20px' }}>
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={events.map((event) => ({ ...event, editable: true }))}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
              }}
              eventClick={this.handleEventClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Scheduler;