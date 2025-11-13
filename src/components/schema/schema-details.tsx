'use client';

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useSearchParams } from 'next/navigation';

import type { GetAllSchemasParams, SchemaConfig } from '@/generated/model';
import { useGetAllSchemas } from '@/generated/schema-management/schema-management';
import { SchemaTable } from '@/components/schema/schema-table';

export default function SchemaDetails(): React.JSX.Element {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') ?? 0);
  const rowsPerPage = Number(searchParams.get('rowsPerPage') ?? 10);

  const params: GetAllSchemasParams = { filter: '' };
  const { data, error, isLoading } = useGetAllSchemas(params, {
    query: { refetchInterval: 60000 },
  });

  if (isLoading) return <Typography>Loading…</Typography>;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  const rows: SchemaConfig[] = data?.data?.data ?? [];
  const total = rows.length;
  const paged = applyPagination(rows, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Schemas</Typography>
        </Stack>
      </Stack>

      <SchemaTable
        count={total}
        page={page}
        rows={paged}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(
  rows: SchemaConfig[],
  page: number,
  rowsPerPage: number
): SchemaConfig[] {
  const start = page * rowsPerPage;
  return rows.slice(start, start + rowsPerPage);
}
