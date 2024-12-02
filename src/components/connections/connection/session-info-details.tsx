'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import {EndPointDetailsDTO, SessionInformationDTO} from "@/generated/model";
import SubscriptionStateTable from "@/components/connections/connection/subscription-state-table";
import SessionDetailsSummary from "@/components/connections/connection/session-details-summary";
import ConnectionInfoDetail from "@/components/connections/connection/connection-info-details";
import Grid from "@mui/material/Grid";
import SubscriptionRequestTable from "@/components/connections/connection/subscription-request-table";

const queryClient = new QueryClient();

const tabs = [
  {
    label: 'Requests',
    value: 'requests',
  },
  {
    label: 'Subscriptions',
    value: 'subscriptions',
  }
];

interface SessionInfoDetailsProps {
  sessionInfo: SessionInformationDTO;
  endPointDetails: EndPointDetailsDTO;
}

export function SessionInfoDetails({ sessionInfo = {}, endPointDetails = {} }: SessionInfoDetailsProps): React.JSX.Element {
  const [currentTab, setCurrentTab] = useState<string>('requests');

  const handleTabsChange = (event: React.SyntheticEvent, value: string): void => {
    setCurrentTab(value);
  };

  return (
    <div>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <ConnectionInfoDetail connectionData={endPointDetails || {}} />
        </Grid>
        <Grid item xs={12} md={6}>
          <SessionDetailsSummary sessionContext={sessionInfo?.sessionInfo || {}} />
        </Grid>
      </Grid>

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
        {currentTab === 'subscriptions' && <SubscriptionStateTable subscriptionStates={sessionInfo?.subscriptionInfo?.subscriptionStateList || [] } /> }
        {currentTab === 'requests' && <SubscriptionRequestTable subscriptionContext={sessionInfo?.subscriptionInfo?.subscriptionContextList || [] }/> }
      </Box>
    </div>
  );
}

export default SessionInfoDetails;
