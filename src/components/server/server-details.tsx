'use client'

import React, {useEffect, useState} from 'react';
import {useGetBuildInfo} from "@/generated/server-management/server-management";
import Container from "@mui/material/Container";
import {Grid} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DataGraph from "@/components/graphs/data-graph";
import {formatUptime} from "@/helper-functions";
import DualNumberGraph from "@/components/graphs/dual-number-graph";

export function ServerDetails () :  React.JSX.Element {

  const { data, error, isLoading } = useGetBuildInfo({
    query:{
      refetchInterval: 2000
    }
  });

  const [cpuTime, setCpuTime] = useState<number[]>([]);
  const [freeMemoryData, setFreeMemoryData] = useState<number[]>([]);
  const [published, setPublished] = useState<number[]>([]);
  const [noInterest, setNoInterest] = useState<number[]>([]);
  const [delivered, setDelivered] = useState<number[]>([]);
  const [retrieved, setRetrieved] = useState<number[]>([]);

  // Update arrays whenever new data is fetched
  useEffect(() :void => {
    if (data) {
      const updateArray = (prev: number[], newValue: number | undefined) => {
        if (typeof newValue !== 'number') return prev;  // skip update if newValue is undefined or invalid
        const newArray = [...prev, newValue];
        return newArray.length > 120 ? newArray.slice(newArray.length - 120) : newArray;
      };
      setCpuTime(prev => updateArray(prev, data.data.cpuPercent));
      setFreeMemoryData(prev => updateArray(prev, data.data.freeMemory));
      setPublished(prev => updateArray(prev, data.data.serverStatistics?.publishedPerSecond || 0));
      setNoInterest(prev => updateArray(prev,data.data.serverStatistics?.noInterestPerSecond || 0))
      setDelivered(prev => updateArray(prev,data.data.serverStatistics?.deliveredPerSecond || 0))
      setRetrieved(prev => updateArray(prev,data.data.serverStatistics?.retrievedPerSecond || 0))
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
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <DualNumberGraph name1='Published' data1={published} name2='No Interest' data2={noInterest} />
        </Grid>
        <Grid item xs={12} md={6}>
          <DualNumberGraph name1='From Store' data1={retrieved} name2='Delivered' data2={delivered} />
        </Grid>
        <Grid item xs={12} md={6}>
          <DataGraph name='Free Memory' data={freeMemoryData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <DataGraph name='Cpu Time' data={cpuTime} />
        </Grid>
      </Grid>
    </Container>
  );
}

