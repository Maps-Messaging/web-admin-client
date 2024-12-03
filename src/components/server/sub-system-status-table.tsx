'use client';

/*
 * Copyright [ 2020 - 2024 ] [Matthew Buckton]
 * Copyright [ 2024 - 2024 ] [Maps Messaging B.V.]
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper, Chip,
} from '@mui/material';
import {useGetServerStatus} from "@/generated/server-management/server-management";

export function SubSystemStatusTable(): React.JSX.Element {

  const { data, error, isLoading } = useGetServerStatus({
    query:{
      refetchInterval: 60000
    }
  });

  if (isLoading) return <div>Loading sub system status...</div>;
  if (error) return <div>Error loading sub system status: {error.message}</div>;

  const statusList = data?.data || [];

  const statusColors: Record<string, 'success' | 'error' | 'warning' | 'default'> = {
    OK: 'success',
    STOPPED: 'error',
    PAUSED: 'warning',
    DISABLED: 'default',
    WARN: 'warning',
    ERROR: 'error',
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
            <TableCell><strong>Comment</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {statusList.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.name}</TableCell>
            <TableCell>
              <Chip
                label={row.status}
                color={statusColors[row.status] || 'default'}
                variant="outlined"
                sx={{ fontWeight: 'bold' }}
              />
            </TableCell>
            <TableCell>{row.comment}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
}

export default SubSystemStatusTable;
