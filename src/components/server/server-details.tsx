'use client'

import React from 'react';
import {useGetBuildInfo} from "@/generated/server-management/server-management";
import Container from "@mui/material/Container";
import {Grid} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export function ServerDetails () :  React.JSX.Element {
  const { data, error, isLoading } = useGetBuildInfo();

  if (isLoading) return <div>Loading name...</div>;
  if (error) return <div>Error loading name: {error.message}</div>;

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        {/* Server basic info */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Server Overview</Typography>
              <Typography variant="body2">Name: {data?.data.serverName}</Typography>
              <Typography variant="body2">Version: {data?.data.version}</Typography>
              <Typography variant="body2">Build Date: {data?.data.buildDate}</Typography>
              <Typography variant="body2">Uptime (secs): {data?.data.uptime}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Memory usage */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Memory Usage</Typography>
              <Typography variant="body2">Total Memory: {((data?.data.totalMemory || 0) / 1024 / 1024).toFixed(2)} MB</Typography>
              <Typography variant="body2">Max Memory: {((data?.data.maxMemory|| 0) / 1024 / 1024).toFixed(2)} MB</Typography>
              <Typography variant="body2">Free Memory: {((data?.data.freeMemory|| 0) / 1024 / 1024).toFixed(2)} MB</Typography>
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
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

