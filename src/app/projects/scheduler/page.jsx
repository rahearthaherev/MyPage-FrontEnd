"use client";

import React, { Component } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, Stack, InputLabel } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

class Scheduler extends Component {
  
  getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
  
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  constructor(props) {
    super(props);

    const storedEvents = localStorage.getItem('events');

    this.state = {
      openDialog: false,
      events: storedEvents ? JSON.parse(storedEvents) : [],
      newEvent: { title: '', description: '', start: this.getCurrentDateTime(), end: this.getCurrentDateTime() },
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
    this.handleDialogOpen();
  };

  handleEventClick = (info) => {
    const { event } = info;
    this.setState({ selectedEvent: event, error: null }); 

    if (event) {
      // newEvent를 선택된 이벤트의 세부 정보로 설정
      this.setState({
        newEvent: {
          title: event.title,
          description: event.extendedProps.description,
          start: event.startStr,
          end: event.endStr,
        },
      });
      this.handleDialogOpen();
    }
  };

  handleEventSave = () => {
    const { selectedEvent, newEvent, events } = this.state;

    if (!selectedEvent) {
      // 새 이벤트 추가 로직 (이전과 동일)
      // ...
    } else {
      // 선택된 이벤트 업데이트 로직
      const { title, description, start, end } = newEvent;

      // 유효성 검사
      if (!title || !start || !end) {
        this.setState({ error: '제목, 시작일 및 종료일은 필수 입력 사항입니다.' });
        return;
      }

      // 시작일과 종료일이 유효한 형식인지 확인
      const startDate = new Date(start);
      const endDate = new Date(end);

      if (isNaN(startDate) || isNaN(endDate)) {
        this.setState({ error: '올바른 날짜 및 시간 형식을 입력하세요.' });
        return;
      }
  
      // 선택된 이벤트 업데이트
      const updatedEvents = events.map((event) =>
        event.id === selectedEvent.id
          ? { ...event, title, description, start, end }
          : event
      );
  
      // 상태 및 로컬 스토리지 업데이트
      this.setState(
        {
          events: updatedEvents,
          newEvent: { title: '', description: '', start: '', end: '' },
          selectedEvent: null,
          error: null,
        },
        () => {
          localStorage.setItem('events', JSON.stringify(this.state.events));
          this.handleDialogClose();
        }
      );
    }
  };

  render() {
    const { openDialog, events, newEvent, selectedEvent, error } = this.state;

    return (
      <div>
        <Stack direction="row" spacing={2} mb={2}>
          <Button variant="contained" onClick={this.handleEventAdd}>
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
              onClick={this.handleEventSave}
              style={{ marginTop: '10px' }}
            >
              {selectedEvent ? '수정' : '추가'}
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