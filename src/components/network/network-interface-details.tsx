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

'use client'

import * as React from 'react';
import Stack from '@mui/material/Stack';

import {type GetAllInterfacesParams, type InterfaceInfoDTO} from "@/generated/model";
import {useGetAllInterfaces} from "@/generated/server-interface-management/server-interface-management";
import Typography from "@mui/material/Typography";
import {NetworkInterfaceTable} from "@/components/network/network-interface-table";

export default function NetworkInterfaceDetails(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 10;

  const params: GetAllInterfacesParams = { filter: '' };
  const { data, error, isLoading } = useGetAllInterfaces(params,{
    query:{
      refetchInterval: 60000
    }
  });

  if (isLoading) return <div>Loading name...</div>;
  if (error) return <div>Error loading name: {error.message}</div>;

  const paginatedInterfaces = applyPagination((data?.data.data || []), page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Network Interfaces</Typography>
        </Stack>
      </Stack>
      <NetworkInterfaceTable
        count={paginatedInterfaces.length}
        page={page}
        rows={paginatedInterfaces}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(rows: InterfaceInfoDTO[], page: number, rowsPerPage: number): InterfaceInfoDTO[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
