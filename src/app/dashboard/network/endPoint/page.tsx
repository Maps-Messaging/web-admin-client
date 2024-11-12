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

import {useSearchParams} from "next/navigation";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import * as React from "react";
import EndPointDetails from "@/components/network/endPoint/end-point-details";
import {useState} from "react";
import {Tab, Tabs} from "@mui/material";
import Box from "@mui/material/Box";
import EndPointConnectionDetails from "@/components/connections/end-point-connection-details";
import EndPointConfiguration from "@/components/network/endPoint/end-point-config";

const queryClient = new QueryClient();


const tabs = [
  {
    label: 'Details',
    value: 'details'
  },
  {
    label: 'Connections',
    value: 'connections'
  },
  {
    label: 'Configuration',
    value: 'configuration'
  }

]
const NetworkEndPointPage = () => {

  const [currentTab, setCurrentTab] = useState<string>('details');

  const handleTabsChange = (event: React.SyntheticEvent, value: string): void => {
    setCurrentTab(value);
  };

  const searchParams = useSearchParams()
  const name = searchParams.get('networkName')

  return (
    <QueryClientProvider client={queryClient}>
      <Tabs
        indicatorColor="primary"
        onChange={handleTabsChange}
        scrollButtons="auto"
        sx={{px: 3}}
        textColor="primary"
        value={currentTab}
        variant="scrollable"
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
          />
        ))}
      </Tabs>
      <Box sx={{mt: 3}}>
        {currentTab === 'details' && <EndPointDetails name={name||''}/>}
        {currentTab === 'connections' && <EndPointConnectionDetails name={name||''}/>}
        {currentTab === 'configuration' && <EndPointConfiguration name={name||''}/>}
      </Box>
    </QueryClientProvider>
  );
};

export default NetworkEndPointPage;
