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

import React from 'react';
import {useGetBuildInfo} from "@/generated/server-management/server-management";
import Container from "@mui/material/Container";
import {Grid} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {formatUptime} from "@/helper-functions";

export function ServerTopLevelStatus () :  React.JSX.Element {

  const { data, error, isLoading } = useGetBuildInfo({
    query:{
      refetchInterval: 5000
    }
  });

  if (isLoading) return <div>Loading name...</div>;
  if (error) return <div>Error loading name: {error.message}</div>;


  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1" gutterBottom>
        Server : {data?.data.serverName}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Server Overview</Typography>
              <Typography variant="body2">Version: {data?.data.version}</Typography>
              <Typography variant="body2">Build Date: {data?.data.buildDate}</Typography>
              <Typography variant="body2">Uptime: {formatUptime(data?.data.uptime || 0)}</Typography>
              <Typography variant="body2">CPU Time: {formatUptime(data?.data.cpuTime || 0)}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Memory usage */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Memory Usage</Typography>
              <Typography variant="body2">Total Memory: {((data?.data.totalMemory || 0) / 1024 / 1024).toFixed(0)} MB</Typography>
              <Typography variant="body2">Free Memory: {((data?.data.freeMemory|| 0) / 1024 / 1024).toFixed(0)} MB</Typography>
              <Typography variant="body2">Max Memory: {((data?.data.maxMemory|| 0) / 1024 / 1024).toFixed(0)} MB</Typography>
              <Typography variant="body2">&nbsp;</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Thread States</Typography>
              {Object.entries(data?.data.threadState || {}).map(([state, count]) => (
                <Typography key={state} variant="body2">{state}: {count}</Typography>
              ))}
              <Typography variant="body2">Total Threads: {data?.data.numberOfThreads}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

