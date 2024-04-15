'use client'

import React, {useEffect, useState} from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';
import type { Theme } from '@mui/material/styles';
import {logger} from "@/lib/default-logger";
import type {ServerStatistics} from "@/generated/model";
import {useGetStats} from "@/generated/server-management/server-management";

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

function calculateStatDiff(current: ServerStatistics, previous: ServerStatistics): ServerStatistics {
  return {
    packetsReceived: (current.packetsReceived ?? 0) - (previous.packetsReceived ?? 0),
    packetsSent: (current.packetsSent ?? 0) - (previous.packetsSent ?? 0),
    totalConnections: (current.totalConnections ?? 0) - (previous.totalConnections ?? 0),
    totalDeliveredMessages: (current.totalDeliveredMessages ?? 0) - (previous.totalDeliveredMessages ?? 0),
    totalDisconnections: (current.totalDisconnections ?? 0) - (previous.totalDisconnections ?? 0),
    totalExpiredMessages: (current.totalExpiredMessages ?? 0) - (previous.totalExpiredMessages ?? 0),
    totalNoInterestMessages: (current.totalNoInterestMessages ?? 0) - (previous.totalNoInterestMessages ?? 0),
    totalPublishedMessages: (current.totalPublishedMessages ?? 0) - (previous.totalPublishedMessages ?? 0),
    totalReadBytes: (current.totalReadBytes ?? 0) - (previous.totalReadBytes ?? 0),
    totalRetrievedMessages: (current.totalRetrievedMessages ?? 0) - (previous.totalRetrievedMessages ?? 0),
    totalSubscribedMessages: (current.totalSubscribedMessages ?? 0) - (previous.totalSubscribedMessages ?? 0),
    totalWriteBytes: (current.totalWriteBytes ?? 0) - (previous.totalWriteBytes ?? 0)
  };
}

export default function MessagingServerDiagram(): React.JSX.Element {

  const [key, setKey] = useState(0)
  const { data, error, isLoading } = useGetStats({
    query:{
      refetchInterval: 2000
    }
  });
  const [previousUpdate, setPreviousUpdate] = useState<ServerStatistics>({});
  const [diff, setDiff] = useState<ServerStatistics>({});


  useEffect(() => {
    if (data) {

      if (JSON.stringify(data?.data?.data) !== JSON.stringify(previousUpdate)) {
        const stat = data?.data?.data || {};
        setDiff(calculateStatDiff(stat, previousUpdate));
        setPreviousUpdate(stat);
        const prev = key + 1;
        setKey(prev);
      }
    }

  }, [data, key]);

  if (isLoading) return <div>Loading name...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  const computeState = ():string =>{
    const totalProcessed = (diff.totalPublishedMessages||0 ) - (diff.totalNoInterestMessages || 0);


    if (totalProcessed === diff.totalSubscribedMessages && diff.totalRetrievedMessages === totalProcessed) {
      return'Optimal';
    } else if ((diff.totalSubscribedMessages||0) > (totalProcessed) && (diff.totalRetrievedMessages ||0)> 0) {
      return'Draining';
    } else if ((totalProcessed) > (diff.totalSubscribedMessages ||0) && (diff.totalRetrievedMessages ||0 ) > 0) {
      return'Backlog';
    } else if ((totalProcessed) > (diff.totalSubscribedMessages ||0) && diff.totalRetrievedMessages === 0) {
      return 'Filtering';
    }
    return 'Unknown';
  }

  return (
    <div key={key}>
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item xs={4}>
        <ArrowBox direction="right">
          <Typography variant="h6">Published Events</Typography>
          <Typography variant="subtitle1">{diff.totalPublishedMessages}</Typography>
        </ArrowBox>
      </Grid>
      <Grid item xs={4}>
        <ArrowBox direction="right">
          <Typography variant="h6">Server</Typography>
          <Typography variant="subtitle1">Status: {computeState()}</Typography>
        </ArrowBox>
      </Grid>
      <Grid item xs={4}>
        <Paper style={{ padding: 16, textAlign: 'center' }}>
          <Typography variant="h6">Subscribed Events</Typography>
          <Typography variant="subtitle1">{diff.totalSubscribedMessages}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <ArrowBox direction="down">
          <Typography variant="h6">Storage</Typography>
          <Typography variant="subtitle1">{diff.totalRetrievedMessages}</Typography>
        </ArrowBox>
      </Grid>
    </Grid>
    </div>
  );
}
