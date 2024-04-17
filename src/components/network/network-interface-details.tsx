'use client'

import * as React from 'react';
import Stack from '@mui/material/Stack';

import {type InterfaceInfo } from "@/generated/model";
import {useGetAllInterfaces} from "@/generated/server-interface-management/server-interface-management";
import Typography from "@mui/material/Typography";
import {NetworkInterfaceTable} from "@/components/network/network-interface-table";

export default function NetworkInterfaceDetails(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 10;

  const { data, error, isLoading } = useGetAllInterfaces({
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
          <Typography variant="h4">Interfaces</Typography>
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

function applyPagination(rows: InterfaceInfo[], page: number, rowsPerPage: number): InterfaceInfo[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
