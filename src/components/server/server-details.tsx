'use client'

import React, {useEffect, useState} from 'react';
import {useGetBuildInfo} from "@/generated/server-management/server-management";
import Container from "@mui/material/Container";
import {Grid} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DataGraph from "@/components/graphs/data-graph";

export function ServerDetails () :  React.JSX.Element {

  const formatUptime = (milliseconds: number): string => {
    const seconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${String(days)}d ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };
  const { data, error, isLoading } = useGetBuildInfo({
    query:{
      refetchInterval: 2000
    }
  });

  const [connectionsData, setConnectionsData] = useState<number[]>([]);
  const [freeMemoryData, setFreeMemoryData] = useState<number[]>([]);
  const [threads, setNoOfThreads] = useState<number[]>([]);

  // Update arrays whenever new data is fetched
  useEffect(() => {
    if (data) {
      // Check each value if it's not undefined before updating the state
      setConnectionsData(prev => [...prev, data?.data.connections || 0]);
      setFreeMemoryData(prev => [...prev, data?.data.freeMemory || 0]);
      setNoOfThreads(prev => [...prev, data?.data.numberOfThreads || 0]);
    }
  }, [data]);

  if (isLoading) return <div>Loading name...</div>;
  if (error) return <div>Error loading name: {error.message}</div>;


  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1" gutterBottom>
        Server : {data?.data.serverName}
      </Typography>
      <Grid container spacing={2}>
        {/* Server basic info */}
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
              <Typography variant="body2">Total Memory: {((data?.data.totalMemory || 0) / 1024 / 1024).toFixed(2)} MB</Typography>
              <Typography variant="body2">Free Memory: {((data?.data.freeMemory|| 0) / 1024 / 1024).toFixed(2)} MB</Typography>
              <Typography variant="body2">Max Memory: {((data?.data.maxMemory|| 0) / 1024 / 1024).toFixed(2)} MB</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Thread states */}
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
      <DataGraph name='Connections' data={connectionsData} />
      <DataGraph name='Free Memory' data={freeMemoryData} />
      <DataGraph name='Threads' data={threads} />
    </Container>
  );
}

