'use client'

import * as React from 'react';
import Stack from '@mui/material/Stack';

import {
  useGetInterface,
} from "@/generated/server-interface-management/server-interface-management";
import Typography from "@mui/material/Typography";

interface EndPointConfigurationProps {
  name: string;
}

export default function EndPointConfiguration({
                                          name=''
                                        }: EndPointConfigurationProps): React.JSX.Element {

  const { data, error, isLoading } = useGetInterface(name ||'',{
    query:{
      refetchInterval: 60000
    }
  });

  if (isLoading) return <div>Loading name...</div>;
  if (error) return <div>Error loading name: {error.message}</div>;

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Configuration</Typography>
          {data?.data.name}
        </Stack>
      </Stack>
      <div>

      </div>
    </Stack>
  );
}

