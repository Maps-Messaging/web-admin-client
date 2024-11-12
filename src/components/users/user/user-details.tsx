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
