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
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import {
  useGetGroupById,
} from "@/generated/authentication-and-authorisation-management/authentication-and-authorisation-management";

import AccessAcl from "@/components/users/acl/access-acl";
import {useGetAuthorisationStaticInfo, useGetIdentityAcl} from "@/generated/default/default";
import toast from "react-hot-toast";
import GroupUsersGrid from "@/components/dashboard/account/group-users-grid";

export default function GroupDetails({ group = '' }) {

  const { data, error, isLoading } = useGetGroupById(group);

  const identityId = data?.data.uniqueId ?? '';

  const {
    data: aclData,
    isLoading: aclLoading,
  } = useGetIdentityAcl(identityId, {
    query: { enabled: Boolean(identityId) }
  });

  const {
    data: permissionsData,
    isLoading: permsLoading,
    error: permsError,
  } = useGetAuthorisationStaticInfo({
    query: {staleTime: 600000},
  });

  const onDelete = async (user:string): Promise<void> => {
    toast(`user removed from user ${user}`);
  }

  if (isLoading || aclLoading || permsLoading) return <div>Loading…</div>;
  if (error || permsError) return <div>Error loading user: {error?.message || " "} {permsError?.message || " "}</div>;

  return (
    <div>
      <Stack spacing={3}>
        <Typography variant="body2">Group Name: {data?.data.name}</Typography>
        <Typography variant="body2">Unique ID: {data?.data.uniqueId}</Typography>
      </Stack>
      <Divider />
      <GroupUsersGrid
        users={(data?.data.usersList || [])}
        onDelete={onDelete}
      />
      <Divider />
      <AccessAcl
        entries={aclData?.data.entries ?? []}
        permissions={permissionsData?.data.permissions ?? []}
      />
    </div>
  );
}
