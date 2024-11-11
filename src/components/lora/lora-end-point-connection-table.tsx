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
              <TableCell>RSSI</TableCell>
              <TableCell>Missed Packets</TableCell>
              <TableCell>Received Packets</TableCell>
              <TableCell>Remote Node ID</TableCell>
              <TableCell>Last Packet ID</TableCell>
              <TableCell>Last Read Time</TableCell>
              <TableCell>Last Write Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.rssi}</TableCell>
                <TableCell>{row.missedPackets}</TableCell>
                <TableCell>{row.receivedPackets}</TableCell>
                <TableCell>{row.remoteNodeId}</TableCell>
                <TableCell>{row.lastPacketId}</TableCell>
                <TableCell>{row.lastReadTime}</TableCell>
                <TableCell>{row.lastWriteTime}</TableCell>
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
