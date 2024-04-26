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

import {DiscoveredServers, type EndPointDetails} from "@/generated/model";
import {DiscoveryRow} from "@/components/discovery/discovery-row";

function noop(): void {
  // do nothing
}

interface DiscoveryTableProps {
  count?: number;
  page?: number;
  rows?: DiscoveredServers[];
  rowsPerPage?: number;
}

export function DiscoveryTable({
                                 count = 0,
                                 rows = [],
                                 page = 0,
                                 rowsPerPage = 0,
                               }: DiscoveryTableProps): React.JSX.Element {
  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Protocol</TableCell>
              <TableCell>Last Read</TableCell>
              <TableCell>Last Write</TableCell>
              <TableCell>Bytes In</TableCell>
              <TableCell>Bytes Out</TableCell>
              <TableCell>Overflows</TableCell>
              <TableCell>Underflows</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <DiscoveryRow
                  key={row?.server || ''}
                  discovered={row}
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
