'use client'

import {useSearchParams} from "next/navigation";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import * as React from "react";
import EndPointDetails from "@/components/network/endPoint/end-point-details";
import {useState} from "react";
import {Tab, Tabs} from "@mui/material";
import Box from "@mui/material/Box";
import EndPointConfiguration from "@/components/network/endPoint/end-point-config";
import ConnectionDetails from "@/components/integration/connection/connection-details";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const queryClient = new QueryClient();


const tabs = [
  {
    label: 'Details',
    value: 'details'
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
  const name = searchParams.get('connectionName')

  return (
    <QueryClientProvider client={queryClient}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Intergration : {name|| 'Loading'}</Typography>
        </Stack>
      </Stack>
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
        {currentTab === 'details' && <ConnectionDetails name={name||''}/>}
        {currentTab === 'configuration' && <EndPointConfiguration name={name||''}/>}
      </Box>
    </QueryClientProvider>
  );
};

export default NetworkEndPointPage;
