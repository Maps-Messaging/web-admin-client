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
'use client';

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useSearchParams } from 'next/navigation';

import type { InterfaceInfoDTO } from '@/generated/model';
import { useGetAllInterfaces } from '@/generated/server-interface-management/server-interface-management';
import { NetworkInterfaceTable } from '@/components/network/network-interface-table';

export default function NetworkInterfaceDetails(): React.JSX.Element {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') ?? 0);
  const rowsPerPage = Number(searchParams.get('rowsPerPage') ?? 10);

  // Keep the original hook call signature you had working
  const { data, error, isLoading } = useGetAllInterfaces(undefined, {
    query: { refetchInterval: 60000 },
  });

  if (isLoading) return <Typography>Loading…</Typography>;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  const list = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data?.data?.data)
      ? data.data.data
      : [];

  const total = list.length;
  const paged =  paginate(list, page, rowsPerPage);


  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Network Interfaces</Typography>
        </Stack>
      </Stack>

      <NetworkInterfaceTable
        count={total}
        page={page}
        rows={paged}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function paginate(rows: InterfaceInfoDTO[], page: number, rowsPerPage: number): InterfaceInfoDTO[] {
  const start = page * rowsPerPage;
  return rows.slice(start, start + rowsPerPage);
}
