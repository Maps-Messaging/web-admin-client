/*
 * Copyright [ 2020 - 2024 ] [Matthew Buckton]
 * Copyright [ 2024 - 2024 ] [Maps Messaging]
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

'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {useGetLoRaEndPointConnections} from "@/generated/lora-device-management/lora-device-management";
import {numberToDateString} from "@/helper-functions";

function noop(): void {
  // do nothing
}

interface LoRaEndPointConnectionTableProps {
  count?: number;
  page?: number;
  deviceName: string;
  nodeId: string;
  rowsPerPage?: number;
}

export function LoRaEndPointConnectionTable({
                                              count = 0,
                                              page = 0,
                                              deviceName = '',
                                              nodeId = '0',
                                              rowsPerPage = 0,
                                            }: LoRaEndPointConnectionTableProps): React.JSX.Element {

  const { data, error, isLoading } = useGetLoRaEndPointConnections(deviceName, nodeId);

  if (isLoading) return <div>Loading devices...</div>;
  if (error) return <div>Error loading devices: {error.message}</div>;


  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Remote Node ID</TableCell>
              <TableCell>RSSI</TableCell>
              <TableCell>Missed Packets</TableCell>
              <TableCell>Received Packets</TableCell>
              <TableCell>Last Packet ID</TableCell>
              <TableCell>Last Read Time</TableCell>
              <TableCell>Last Write Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.remoteNodeId}</TableCell>
                <TableCell>{row.rssi}</TableCell>
                <TableCell>{row.missedPackets}</TableCell>
                <TableCell>{row.receivedPackets}</TableCell>
                <TableCell>{row.lastPacketId}</TableCell>
                <TableCell>{numberToDateString(row.lastReadTime||0)}</TableCell>
                <TableCell>{numberToDateString(row.lastWriteTime||0)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        onPageChange={noop}
        onRowsPerPageChange={noop}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}

export default LoRaEndPointConnectionTable;
