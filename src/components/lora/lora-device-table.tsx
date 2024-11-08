// LoRaDeviceTable.tsx

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

import { type LoRaDeviceInfo } from "@/generated/model";
import {LoRaDeviceRow} from "@/components/lora/lora-device-row";


function noop(): void {
  // do nothing
}

interface LoRaDeviceTableProps {
  count?: number;
  page?: number;
  rows?: LoRaDeviceInfo[];
  rowsPerPage?: number;
}

export function LoRaDeviceTable({
                                  count = 0,
                                  rows = [],
                                  page = 0,
                                  rowsPerPage = 0,
                                }: LoRaDeviceTableProps): React.JSX.Element {
  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Pkts In</TableCell>
              <TableCell>Pkts Out</TableCell>
              <TableCell>Bytes In</TableCell>
              <TableCell>Bytes Out</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <LoRaDeviceRow
                key={row?.name || ''}
                deviceInfo={row}
              />
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
