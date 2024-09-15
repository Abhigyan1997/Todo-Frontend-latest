// components/Notification/Notification.js
import React from 'react';
import { Snackbar, SnackbarContent, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

const Notification = ({ message, severity, onClose }) => {
  const backgroundColor = severity === 'error' ? '#f44336' : '#4caf50';

  return (
    <Snackbar
      open={!!message}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <SnackbarContent
        style={{ backgroundColor }}
        message={message}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={onClose}>
            <Close fontSize="small" />
          </IconButton>
        }
      />
    </Snackbar>
  );
};

export default Notification;
