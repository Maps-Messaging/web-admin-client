import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
import { SubscriptionContextDTO } from '@/generated/model';

interface SubscriptionRequestTableProps {
  subscriptionContext: SubscriptionContextDTO[];
}

const SubscriptionRequestTable: React.FC<SubscriptionRequestTableProps> = ({ subscriptionContext }) => {
  return (
    <TableContainer component={Paper} sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Subscription Context Details
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Destination Name</TableCell>
            <TableCell>Alias</TableCell>
            <TableCell>Max At Rest</TableCell>
            <TableCell>Receive Maximum</TableCell>
            <TableCell>Subscription ID</TableCell>
            <TableCell>Shared Name</TableCell>
            <TableCell>Selector</TableCell>
            <TableCell>Acknowledgement Controller</TableCell>
            <TableCell>Retain Handler</TableCell>
            <TableCell>Quality of Service</TableCell>
            <TableCell>Credit Handler</TableCell>
            <TableCell>Destination Mode</TableCell>
            <TableCell>No Local Messages</TableCell>
            <TableCell>Retain As Publish</TableCell>
            <TableCell>Allow Overlap</TableCell>
            <TableCell>Browser</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subscriptionContext.map((context, index) => (
            <TableRow key={index}>
              <TableCell>{context.destinationName || 'N/A'}</TableCell>
              <TableCell>{context.alias || 'N/A'}</TableCell>
              <TableCell>{context.maxAtRest}</TableCell>
              <TableCell>{context.receiveMaximum}</TableCell>
              <TableCell>{context.subscriptionId}</TableCell>
              <TableCell>{context.sharedName || 'N/A'}</TableCell>
              <TableCell>{context.selector || 'N/A'}</TableCell>
              <TableCell>{context.acknowledgementController}</TableCell>
              <TableCell>{context.retainHandler}</TableCell>
              <TableCell>{context.qualityOfService}</TableCell>
              <TableCell>{context.creditHandler}</TableCell>
              <TableCell>{context.destinationMode}</TableCell>
              <TableCell>{context.noLocalMessages ? 'Yes' : 'No'}</TableCell>
              <TableCell>{context.retainAsPublish ? 'Yes' : 'No'}</TableCell>
              <TableCell>{context.allowOverlap ? 'Yes' : 'No'}</TableCell>
              <TableCell>{context.browser ? 'Yes' : 'No'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SubscriptionRequestTable;
