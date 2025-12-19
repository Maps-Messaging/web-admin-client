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

'use client'

import * as React from 'react';
import Stack from '@mui/material/Stack';

import {type EndPointSummaryDTO} from "@/generated/model";
import Typography from "@mui/material/Typography";
import {ConnectionTable} from "@/components/connections/connection-table";
import {useGetEndPointConnections} from "@/generated/server-interface-management/server-interface-management";

interface EndPointConnectionDetailsProps {
  name: string;
}
export default function EndPointConnectionDetails({
                                                    name=''
                                                  }: EndPointConnectionDetailsProps): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 20;

  const { data, error, isLoading } = useGetEndPointConnections(name ||'',{
    query:{
      refetchInterval: 6000
    }
  });


  if (isLoading) return <div>Loading details...</div>;
  if (error) return <div>Error loading details: {error.message}</div>;

  const paginatedInterfaces = applyPagination((data?.data || []), page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Connections</Typography>
        </Stack>
      </Stack>
      <ConnectionTable
        count={paginatedInterfaces.length}
        page={page}
        rows={paginatedInterfaces}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(rows: EndPointSummaryDTO[], page: number, rowsPerPage: number): EndPointSummaryDTO[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
