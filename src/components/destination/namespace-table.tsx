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
import TableSortLabel from '@mui/material/TableSortLabel';


import {DestinationRow} from "@/components/destination/destination-row";
import {GetAllDestinationsSortBy} from "@/generated/model";
import {useGetAllDestinations} from "@/generated/destination-management/destination-management";

function noop(): void {
  // do nothing
}

interface NameSpaceTableProps {
  count?: number;
  page?: number;
  rowsPerPage?: number;
}

export function NameSpaceTable({
                                 count = 0,
                                 page = 0,
                                 rowsPerPage = 20, // Default to 20 rows per page
                               }: NameSpaceTableProps): React.JSX.Element {
  const [sortBy, setSortBy] = React.useState<GetAllDestinationsSortBy>('Name');

  const params = {
    filter: '',
    size: rowsPerPage,
    sortBy,
  };

  const { data, error, isLoading, refetch } = useGetAllDestinations(params, {
    query: {
      refetchInterval: 10000,
    },
  });

  const handleSort = async (column: GetAllDestinationsSortBy): Promise<void> => {
    setSortBy(column);
    await refetch(); // Await the promise returned by refetch
  };

  if (isLoading) return <div>Loading name...</div>;
  if (error) return <div>Error loading name: {error.message}</div>;

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'Name'}
                  direction="asc" // Server should handle direction if needed
                  onClick={() => {
                    void handleSort('Name'); // Explicitly ignore the promise
                  }}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>Type</TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'Published'}
                  direction="asc"
                  onClick={() => {
                    void handleSort('Published');
                  }}
                >
                  Published
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'Delivered'}
                  direction="asc"
                  onClick={() => {
                    void handleSort('Delivered');
                  }}
                >
                  Delivered
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'Stored'}
                  direction="asc"
                  onClick={() => {
                    void handleSort('Stored');
                  }}
                >
                  Stored
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'Pending'}
                  direction="asc"
                  onClick={() => {
                    void handleSort('Pending');
                  }}
                >
                  Pending
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'Delayed'}
                  direction="asc"
                  onClick={() => {
                    void handleSort('Delayed');
                  }}
                >
                  Delayed
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'Expired'}
                  direction="asc"
                  onClick={() => {
                    void handleSort('Expired');
                  }}
                >
                  Expired
                </TableSortLabel>
              </TableCell>
              <TableCell>Read Time(ns)</TableCell>
              <TableCell>Write Time(ns)</TableCell>
              <TableCell>Delete Time(ns)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data?.map((destination): React.JSX.Element => (
              <DestinationRow key={destination.name} destination={destination} />
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
        rowsPerPageOptions={[5, 10, 20, 50]}
      />
    </Card>
  );
}
