'use client'

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';

import {UserTable} from "@/components/users/user-table";
import {GetAllUsersParams, UserDTO} from "@/generated/model";
import {
  useGetAllUsers
} from "@/generated/authentication-and-authorisation-management/authentication-and-authorisation-management";

export default function UsersDetails(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 10;

  const params: GetAllUsersParams = { filter: '' };
  const { data, error, isLoading } = useGetAllUsers( params,{
    query:{
      refetchInterval: 120000
    }
  });


  if (isLoading) return <div>Loading name...</div>;
  if (error) return <div>Error loading name: {error.message}</div>;

  const paginatedUsers = applyPagination((data?.data.data || []), page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Users</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add
          </Button>
        </div>
      </Stack>
      <UserTable
        count={paginatedUsers.length}
        page={page}
        rows={paginatedUsers}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(rows: UserDTO[], page: number, rowsPerPage: number): UserDTO[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
