'use client'

import * as React from 'react';
import Stack from '@mui/material/Stack';

import {type EndPointDetails} from "@/generated/model";
import Typography from "@mui/material/Typography";
import {useGetAllConnections} from "@/generated/connection-management/connection-management";
import {ConnectionTable} from "@/components/connections/connection-table";

interface EndPointConnectionDetailsProps {
  name: string;
}
export default function EndPointConnectionDetails({
                                                    name=''
                                                  }: EndPointDetailsProps): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 20;

  const { data, error, isLoading } = useGetAllConnections({
    query:{
      refetchInterval: 2000
    }
  });

  if (isLoading) return <div>Loading details...</div>;
  if (error) return <div>Error loading details: {error.message}</div>;

  const paginatedInterfaces = applyPagination((data?.data.data || []), page, rowsPerPage);

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

function applyPagination(rows: EndPointDetails[], page: number, rowsPerPage: number): EndPointDetails[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
