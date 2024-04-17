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

import {type InterfaceInfo} from "@/generated/model";
import {NetworkInterfaceRow} from "@/components/network/network-interface-row";

function noop(): void {
  // do nothing
}

interface NetworkInterfaceTableProps {
  count?: number;
  page?: number;
  rows?: InterfaceInfo[];
  rowsPerPage?: number;
}

export function NetworkInterfaceTable({
                                 count = 0,
                                 rows = [],
                                 page = 0,
                                 rowsPerPage = 0,
                               }: NetworkInterfaceTableProps): React.JSX.Element {
  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Interface</TableCell>
              <TableCell>Connections</TableCell>
              <TableCell>Msg In</TableCell>
              <TableCell>Msg Out</TableCell>
              <TableCell>Bytes In</TableCell>
              <TableCell>Bytes Out</TableCell>
              <TableCell>State</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <NetworkInterfaceRow
                  key={row?.name || ''}
                  networkInfo={row}
                />
              );
            })}
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
