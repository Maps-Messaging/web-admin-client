import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';
import {SubscriptionStateDTO} from "@/generated/model";


interface SubscriptionStateTableProps {
  subscriptionStates: SubscriptionStateDTO[];
  displayName?: boolean;
}

const SubscriptionStateTable: React.FC<SubscriptionStateTableProps> = ({ subscriptionStates, displayName = true }) => {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Subscription States
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            {displayName && (<TableCell>Destination Name</TableCell>)}
            {!displayName && (<TableCell>Session Name</TableCell>)}
            <TableCell align="right">Hibernating</TableCell>
            <TableCell align="right">Size</TableCell>
            <TableCell align="right">Pending</TableCell>
            <TableCell align="center">In Flight</TableCell>
            <TableCell align="center">At Rest</TableCell>
            <TableCell align="center">Paused</TableCell>
            <TableCell align="right">Ignored</TableCell>
            <TableCell align="right">Registered</TableCell>
            <TableCell align="right">Sent</TableCell>
            <TableCell align="right">Acked</TableCell>
            <TableCell align="right">Rolled Back</TableCell>
            <TableCell align="right">Expired</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subscriptionStates.map((state, index) => (
            <TableRow key={index}>
              {displayName && (<TableCell>{state.destinationName}</TableCell>)}
              {!displayName && (<TableCell>{state.sessionId}</TableCell>)}
              <TableCell align="center">{state.hibernating ? 'Yes' : 'No'}</TableCell>
              <TableCell align="right">{state.size}</TableCell>
              <TableCell align="right">{state.pending}</TableCell>
              <TableCell align="center">{state.hasMessagesInFlight ? 'Yes' : 'No'}</TableCell>
              <TableCell align="center">{state.hasAtRestMessages ? 'Yes' : 'No'}</TableCell>
              <TableCell align="center">{state.paused ? 'Yes' : 'No'}</TableCell>
              <TableCell align="right">{state.messagesIgnored}</TableCell>
              <TableCell align="right">{state.messagesRegistered}</TableCell>
              <TableCell align="right">{state.messagesSent}</TableCell>
              <TableCell align="right">{state.messagesAcked}</TableCell>
              <TableCell align="right">{state.messagesRolledBack}</TableCell>
              <TableCell align="right">{state.messagesExpired}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SubscriptionStateTable;
