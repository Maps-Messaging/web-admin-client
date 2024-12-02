'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useGetConnectionDetails } from '@/generated/connection-management/connection-management';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Grid } from '@mui/material';
import { formatNumberWithPowerUnit, formatUptime, numberToDateString } from '@/helper-functions';
import ProtocolInformationRenderer from "@/components/connections/connection/protocol-information-renderer";

const queryClient = new QueryClient();

const tabs = [
  {
    label: 'Subscriptions',
    value: 'subscriptions',
  },
  {
    label: 'State',
    value: 'state',
  },
];

interface ConnectionDetailProps {
  connectionId: string;
}

export function ConnectionDetail({ connectionId = '' }: ConnectionDetailProps): React.JSX.Element {
  const [currentTab, setCurrentTab] = useState<string>('subscriptions');

  const handleTabsChange = (event: React.SyntheticEvent, value: string): void => {
    setCurrentTab(value);
  };

  const request = { connectionId };
  const { data, error, isLoading } = useGetConnectionDetails(request, {
    query: { refetchInterval: 10000 },
  });

  if (error) {
    return <div>Failed to load connection details.</div>;
  }

  if (isLoading) {
    return <div>Please wait for details.</div>;
  }

  const connectionData = data?.data;

  return (
    <QueryClientProvider client={queryClient}>
      {/* Basic Connection Info */}
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Connection Details
          </Typography>
          <Grid container spacing={2}>

            {/* Name */}
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Name:</strong>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{connectionData?.endPointSummary?.name || 'N/A'}</Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* Adapter */}
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Adapter:</strong>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{connectionData?.endPointSummary?.adapter || 'N/A'}</Typography>
                </Grid>
              </Grid>
            </Grid>



            {/* User */}
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography>
                    <strong>User:</strong>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{connectionData?.endPointSummary?.user || 'Anonymous'}</Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* Protocol */}
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Protocol:</strong>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    {connectionData?.endPointSummary?.protocolName || 'N/A'}{' '}
                    {connectionData?.endPointSummary?.protocolVersion || ''}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* Time Connected */}
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Time Connected:</strong>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    {formatUptime(connectionData?.endPointSummary?.connectedTimeMs || 0)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>


            {/* Bytes Received */}
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Bytes Received:</strong>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    {formatNumberWithPowerUnit(connectionData?.endPointSummary?.totalBytesRead || 0)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* Last Read */}
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Last Read:</strong>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    {numberToDateString(connectionData?.endPointSummary?.lastRead || 0)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>


            {/* Bytes Written */}
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Bytes Written:</strong>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    {formatNumberWithPowerUnit(connectionData?.endPointSummary?.totalBytesWritten || 0)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>


            {/* Last Write */}
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Last Write:</strong>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    {numberToDateString(connectionData?.endPointSummary?.lastWrite || 0)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>


          </Grid>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs
        indicatorColor="primary"
        onChange={handleTabsChange}
        scrollButtons="auto"
        sx={{ px: 3 }}
        textColor="primary"
        value={currentTab}
        variant="scrollable"
      >
        {tabs.map((tab) => (
          <Tab key={tab.value} label={tab.label} value={tab.value} />
        ))}
      </Tabs>

      {/* Tab Content */}
      <Box sx={{ mt: 3 }}>
        {currentTab === 'state' && <ProtocolInformationRenderer protocol={connectionData?.protocolInformation || {type:'coap'}} /> }
        {currentTab === 'subscriptions' && (
          <div>
            {/* Render subscription-related information here */}
          </div>
        )}
      </Box>
    </QueryClientProvider>
  );
}

export default ConnectionDetail;
