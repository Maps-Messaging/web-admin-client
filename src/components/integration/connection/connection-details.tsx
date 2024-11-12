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

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { useGetIntegrationStatus } from "@/generated/server-integration-management/server-integration-management";
import { formatNumberWithPowerUnit } from "@/helper-functions";
import {ConnectionStatus} from "@/components/integration/connection/connection-status";

interface ConnectionDetailsProps {
  name: string;
}

export default function ConnectionDetails({
                                            name = ''
                                          }: ConnectionDetailsProps): React.JSX.Element {

  const { data, error, isLoading } = useGetIntegrationStatus(name || '', {
    query: {
      refetchInterval: 10000
    }
  });

  if (isLoading) return <div>Loading name...</div>;
  if (error) return <div>Error loading name: {error.message}</div>;

  return (
    <Stack spacing={3}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {data?.data.interfaceName}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <Typography variant="body2" color="textSecondary">Msg In:</Typography>
              <Typography variant="body1">{formatNumberWithPowerUnit(data?.data.messagesReceived || 0)}</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="body2" color="textSecondary">Msg Out:</Typography>
              <Typography variant="body1">{formatNumberWithPowerUnit(data?.data.messagesSent || 0)}</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="body2" color="textSecondary">Byte In:</Typography>
              <Typography variant="body1">{formatNumberWithPowerUnit(data?.data.bytesReceived || 0)}</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="body2" color="textSecondary">Bytes Out:</Typography>
              <Typography variant="body1">{formatNumberWithPowerUnit(data?.data.bytesSent || 0)}</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="body2" color="textSecondary">State:</Typography>
              <Typography variant="subtitle2">{data?.data.state}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <ConnectionStatus status={data?.data} />
    </Stack>
  );
}
