"use client"

import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import Schedule from '@mui/icons-material/Schedule';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const DateScheduler = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSchedule = () => {
    // Handle scheduling logic here
    onClose();
  };

  return (
    <>
      <Typography variant="body1" gutterBottom>
        Select a date for scheduling:
      </Typography>
      <DatePicker
        label="Select Date"
        value={selectedDate}
        onChange={handleDateChange}
        textField={(props) => <TextField {...props} margin="normal" fullWidth />}
      />
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSchedule} color="primary">
          Schedule
        </Button>
      </DialogActions>
    </>
  );
};

const Scheduler = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div>
        <Button variant="contained" color="primary" startIcon={<Schedule />} onClick={handleOpenDialog}>
          Schedule
        </Button>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Schedule Event</DialogTitle>
          <DialogContent>
            <DateScheduler onClose={handleCloseDialog} />
          </DialogContent>
        </Dialog>
      </div>
    </LocalizationProvider>
  );
};

export default Scheduler;
