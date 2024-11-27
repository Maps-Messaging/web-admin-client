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

import {useGetAllDestinations} from "@/generated/destination-management/destination-management";
import {DestinationRow} from "@/components/destination/destination-row";

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
                                        rowsPerPage = 0,
                                      }: NameSpaceTableProps): React.JSX.Element {

  const filter = {
    filter: ''
  }

  const { data, error, isLoading } = useGetAllDestinations(filter,{
    query:{
      refetchInterval: 10000
    }
  });

  if (isLoading) return <div>Loading name...</div>;
  if (error) return <div>Error loading name: {error.message}</div>;

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Published</TableCell>
              <TableCell>Delivered</TableCell>
              <TableCell>Stored</TableCell>
              <TableCell>Pending</TableCell>

              <TableCell>Delayed</TableCell>
              <TableCell>Expired</TableCell>
              <TableCell>Read Time(ns)</TableCell>
              <TableCell>Write Time(ns)</TableCell>
              <TableCell>Delete Time(ns)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data.data?.map((destination) => {
              if (destination?.name) {
                return (
                  <DestinationRow
                    key={destination.name}
                    destination={destination}
                  />
                );
              }
              return null; // Explicitly return null when the condition fails.
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
