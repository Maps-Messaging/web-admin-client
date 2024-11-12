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
