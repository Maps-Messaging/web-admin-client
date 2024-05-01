'use client'

import * as React from 'react';
import Stack from '@mui/material/Stack';

import {type InterfaceInfo } from "@/generated/model";
import {
  pauseInterface, resumeInterface,
  startInterface, stopInterface,
  useGetAllInterfaces, useGetInterface,
  useGetInterfaceStatus
} from "@/generated/server-interface-management/server-interface-management";
import Typography from "@mui/material/Typography";
import {NetworkInterfaceTable} from "@/components/network/network-interface-table";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ActionController from "@/components/general/action-controller";
import YamlEditor from "@/components/general/yaml-editor";

interface EndPointDetailsProps {
  name: string;
}

export default function EndPointDetails({
                                          name=''
                                        }: EndPointDetailsProps): React.JSX.Element {

  const { data, error, isLoading } = useGetInterface(name ||'',{
    query:{
      refetchInterval: 60000
    }
  });

  if (isLoading) return <div>Loading name...</div>;
  if (error) return <div>Error loading name: {error.message}</div>;


  const onStart = () => {
    startInterface(name);
  };

  const onStop = () => {
    stopInterface(name);
  };

  const onPause = () => {
    pauseInterface(name);
  };

  const onResume = () => {
    resumeInterface(name);
  };

  const onConfigChange = () =>{}
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">{data?.data.name || 'Loading'}</Typography>
        </Stack>
      </Stack>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            {data?.data.host}:{data?.data.port}
          </Typography>
          <ActionController
            currentState={data?.data.state||''}
            onPause={onPause}
            onStart={onStart}
            onStop={onStop}
            onResume={onResume}
          />
        </CardContent>
      </Card>
      <div>
        <YamlEditor value={data?.data.config || ''} onChange={onConfigChange} />
      </div>
    </Stack>
  );
}

