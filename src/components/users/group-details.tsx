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
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';

import {type GetAllGroupsParams, type GroupDTO} from "@/generated/model";
import {
  useGetAllGroups} from "@/generated/authentication-and-authorisation-management/authentication-and-authorisation-management";
import {GroupTable} from "@/components/users/group-table";

export default function GroupDetails(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 10;
  const params: GetAllGroupsParams = { filter: '' };
  const { data, error, isLoading } = useGetAllGroups(params,{
    query:{
      refetchInterval: 120000
    }
  });


  if (isLoading) return <div>Loading groups...</div>;
  if (error) return <div>Error loading groups: {error.message}</div>;

  const paginatedGroups = applyPagination((data?.data.data || []), page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Groups</Typography>
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
      <GroupTable
        count={paginatedGroups.length}
        page={page}
        rows={paginatedGroups}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(rows: GroupDTO[], page: number, rowsPerPage: number): GroupDTO[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
