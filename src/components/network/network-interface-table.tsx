/*
 * Copyright [ 2020 - 2024 ] [Matthew Buckton]
 * Copyright [ 2024 - 2026 ] [Maps Messaging B.V.]
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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import type { InterfaceInfoDTO } from '@/generated/model';
import { NetworkInterfaceRow } from '@/components/network/network-interface-row';

interface NetworkInterfaceTableProps {
  rows: InterfaceInfoDTO[];
  count: number;
  page: number;
  rowsPerPage: number;
}

export function NetworkInterfaceTable({
                                        rows,
                                        count,
                                        page,
                                        rowsPerPage,
                                      }: NetworkInterfaceTableProps): React.JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateQuery = React.useCallback(
    (next: Record<string, string | number | undefined>) => {
      const params = new URLSearchParams(searchParams?.toString() ?? '');
      Object.entries(next).forEach(([k, v]) => {
        if (v === undefined || v === null || v === '') params.delete(k);
        else params.set(k, String(v));
      });
      router.replace(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const handlePageChange = (_: unknown, newPage: number) => {
    updateQuery({ page: newPage, rowsPerPage });
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newRpp = Number(event.target.value) || 10;
    updateQuery({ page: 0, rowsPerPage: newRpp });
  };

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Interface</TableCell>
              <TableCell>Connections</TableCell>
              <TableCell>Msg In</TableCell>
              <TableCell>Msg Out</TableCell>
              <TableCell>Bytes In</TableCell>
              <TableCell>Bytes Out</TableCell>
              <TableCell>Control</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <NetworkInterfaceRow
                key={row?.name ?? ''}
                networkInfo={row}
              />
            ))}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
