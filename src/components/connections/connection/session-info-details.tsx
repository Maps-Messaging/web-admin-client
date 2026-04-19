/*
 * Copyright [ 2020 - 2024 ] [Matthew Buckton]
 * Copyright [ 2024 - 2026 ] [Maps Messaging B.V.]
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

'use client';

import * as React from 'react';
import {useState} from 'react';
import {Tab, Tabs} from '@mui/material';
import Box from '@mui/material/Box';
import {EndPointDetailsDTO, SessionInformationDTO} from "@/generated/model";
import SubscriptionStateTable from "@/components/connections/connection/subscription-state-table";
import SessionDetailsSummary from "@/components/connections/connection/session-details-summary";
import ConnectionInfoDetail from "@/components/connections/connection/connection-info-details";
import Grid from "@mui/material/Grid";
import SubscriptionRequestTable from "@/components/connections/connection/subscription-request-table";

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
