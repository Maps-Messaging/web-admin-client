/*
 * Copyright [ 2020 - 2024 ] [Matthew Buckton]
 * Copyright [ 2024 - 2024 ] [Maps Messaging]
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
import {
  useGetUser,
} from "@/generated/authentication-and-authorisation-management/authentication-and-authorisation-management";
import UserGroupGrid from "@/components/dashboard/account/user-group-grid";
import Divider from "@mui/material/Divider";
import UserAttributesTable from "@/components/users/user/user-attributes-table";
import toast from "react-hot-toast";

interface UserDetailsProps {
  user: string;
}

export default function UserDetails({
                                      user = ''
                                    }: UserDetailsProps): React.JSX.Element {

  const { data, error, isLoading } = useGetUser(user,{
    query:{
      refetchInterval: 120000
    }
  });


  const onDelete = async (group:string): Promise<void> => {
    toast(`group removed from user ${group}`);
  }

  if (isLoading) return <div>Loading name...</div>;
  if (error) return <div>Error loading name: {error.message}</div>;

  return (
    <div>
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="body2">Username: {data?.data.username}</Typography>
        </Stack>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="body2">Unique ID: {data?.data.uniqueId}</Typography>
        </Stack>
      </Stack>
    </Stack>
      <Divider></Divider>
      <UserAttributesTable attributes={ data?.data.attributes || {}} />
      <Divider></Divider>
      <UserGroupGrid groups={(data?.data.groupList || []).filter((group): group is string => group !== null)} onDelete={onDelete} />
    </div>
  );
}
