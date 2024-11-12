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

import {
  useGetInterface,
} from "@/generated/server-interface-management/server-interface-management";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {EndPointStatus} from "@/components/network/endPoint/end-point-status";
import EndPointActionController from "@/components/network/endPoint/end-point-action-controller";

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
          <EndPointActionController name={name||''} />
        </CardContent>
      </Card>
      <EndPointStatus name={name}/>
    </Stack>
  );
}

