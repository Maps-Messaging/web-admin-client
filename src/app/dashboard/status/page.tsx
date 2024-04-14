'use client'

import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Theme } from '@mui/material';
import { styled } from '@mui/system';

interface ArrowBoxProps {
  direction: 'right' | 'left' | 'down';
}
const ArrowBox = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'direction',
})<ArrowBoxProps>(({ theme, direction }) => ({
  padding: 16,
  textAlign: 'center',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 0,
    height: 0,
    border: '20px solid transparent',
    ...(direction === 'right' && {
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
      borderLeftColor: (theme as Theme).palette.primary.main,
      right: -40,
      top: '50%',
      transform: 'translateY(-50%)',
    }),
    ...(direction === 'left' && {
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
      borderRightColor: (theme as Theme).palette.primary.main,
      left: -40,
      top: '50%',
      transform: 'translateY(-50%)',
    }),
    ...(direction === 'down' && {
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderTopColor: (theme as Theme).palette.primary.main,
      bottom: -40,
      left: '50%',
      transform: 'translateX(-50%)',
    }),
  }}));

export default function MessagingServerDiagram(): React.JSX.Element {
  const [events, setEvents] = useState({
    publish: 0,
    subscribe: 0,
    storage: 0,
  });

  const [status, setStatus] = useState('');

  useEffect(() => {
    const { publish, subscribe, storage } = events;
    if (publish === subscribe && storage === 0) {
      setStatus('Optimal');
    } else if (subscribe > publish && storage > 0) {
      setStatus('Draining');
    } else if (publish > subscribe && storage > 0) {
      setStatus('Backlog');
    } else if (publish > subscribe && storage === 0) {
      setStatus('Filtering');
    } else {
      setStatus('Unknown');
    }
  }, [events]);

   useEffect(() => {
     const interval = setInterval(() => {
       setEvents({
         publish: Math.floor(Math.random() * 100),
         subscribe: Math.floor(Math.random() * 100),
         storage: Math.floor(Math.random() * 100),
       });
     }, 5000);
     return () => {
       clearInterval(interval);
     };
   }, []);

  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item xs={4}>
        <ArrowBox direction="right">
          <Typography variant="h6">Published Events</Typography>
          <Typography variant="subtitle1">{events.publish}</Typography>
        </ArrowBox>
      </Grid>
      <Grid item xs={4}>
        <ArrowBox direction="right">
          <Typography variant="h6">Server</Typography>
          <Typography variant="subtitle1">Status: {status}</Typography>
        </ArrowBox>
      </Grid>
      <Grid item xs={4}>
        <Paper style={{ padding: 16, textAlign: 'center' }}>
          <Typography variant="h6">Subscribed Events</Typography>
          <Typography variant="subtitle1">{events.subscribe}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <ArrowBox direction="down">
          <Typography variant="h6">Storage</Typography>
          <Typography variant="subtitle1">{events.storage}</Typography>
        </ArrowBox>
      </Grid>
    </Grid>
  );
}
