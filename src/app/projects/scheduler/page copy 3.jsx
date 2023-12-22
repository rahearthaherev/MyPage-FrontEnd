"use client";

import React, { Component } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, Stack, InputLabel } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

class Scheduler extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openDialog: false,
      events: [],
      newEvent: { title: '', description: '', start: '', end: '' },
      selectedEvent: null,
    };
  }

  handleDialogOpen = () => {
    this.setState({ openDialog: true });
  };

  handleDialogClose = () => {
    this.setState({ openDialog: false });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      newEvent: { ...prevState.newEvent, [name]: value },
    }));
  };

  handleEventAdd = () => {
    this.setState((prevState) => ({
      events: [...prevState.events, prevState.newEvent],
      newEvent: { title: '', description: '', start: '', end: '' },
      selectedEvent: null,
    }));
  };

  handleEventClick = (info) => {
    this.setState({ selectedEvent: info.event });
    this.handleDialogOpen();
  };

  render() {
    const { openDialog, events, newEvent, selectedEvent } = this.state;

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
            {selectedEvent ? (
              <>
                <InputLabel>일정 제목</InputLabel>
                <TextField
                  value={selectedEvent.title}
                  fullWidth
                  margin="normal"
                  disabled
                />

                <InputLabel>일정 내용</InputLabel>
                <TextField
                  value={selectedEvent.extendedProps.description}
                  fullWidth
                  margin="normal"
                  disabled
                />

                <InputLabel>일정 시작일</InputLabel>
                <TextField
                  value={selectedEvent.startStr}
                  fullWidth
                  margin="normal"
                  disabled
                />

                <InputLabel>일정 종료일</InputLabel>
                <TextField
                  value={selectedEvent.endStr}
                  fullWidth
                  margin="normal"
                  disabled
                />
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

                <InputLabel>일정 시작일 (년-월-일-ap.pm-시-분)</InputLabel>
                <TextField
                  name="start"
                  type="datetime-local"
                  value={newEvent.start}
                  onChange={this.handleInputChange}
                  fullWidth
                  margin="normal"
                />

                <InputLabel>일정 종료일 (년-월-일-ap.pm-시-분)</InputLabel>
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

            <Button onClick={selectedEvent ? this.handleDialogClose : () => { this.handleEventAdd(); this.handleDialogClose(); }}>
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
