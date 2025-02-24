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

import {type GetAllIntegrationsParams, type IntegrationInfoDTO} from "@/generated/model";
import Typography from "@mui/material/Typography";
import {NetworkIntegrationTable} from "@/components/integration/network-integration-table";
import {useGetAllIntegrations} from "@/generated/server-integration-management/server-integration-management";

export default function NetworkIntegrationDetails(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 10;

  const params: GetAllIntegrationsParams= { filter: '' };
  const { data, error, isLoading } = useGetAllIntegrations(params,{
    query:{
      refetchInterval: 60000
    }
  });

  if (isLoading) return <div>Loading name...</div>;
  if (error) return <div>Error loading name: {error.message}</div>;

  const paginatedInterfaces :IntegrationInfoDTO[] = applyPagination((data?.data.data || []), page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Broker Integration</Typography>
        </Stack>
      </Stack>
      <NetworkIntegrationTable
        count={paginatedInterfaces.length}
        page={page}
        rows={paginatedInterfaces}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(rows: IntegrationInfoDTO[], page: number, rowsPerPage: number): IntegrationInfoDTO[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
