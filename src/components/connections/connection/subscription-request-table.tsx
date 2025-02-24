/*
 * Copyright [ 2020 - 2024 ] [Matthew Buckton]
 * Copyright [ 2024 - 2025 ] [Maps Messaging B.V.]
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';
import {SubscriptionContextDTO} from '@/generated/model';

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
