'use client'

import {useSearchParams} from "next/navigation";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import * as React from "react";
import {useState} from "react";
import {Tab, Tabs} from "@mui/material";
import Box from "@mui/material/Box";
import LoraEndPointConnectionTable from "@/components/lora/lora-end-point-connection-table";
import LoRaDeviceConfiguration from "@/components/lora/lora-device-config";

const queryClient = new QueryClient();


const tabs = [
  {
    label: 'Connections',
    value: 'connections'
  },
  {
    label: 'Configuration',
    value: 'configuration'
  }

]
const LoRaEndPointPage = () => {

  const [currentTab, setCurrentTab] = useState<string>('connections');

  const handleTabsChange = (event: React.SyntheticEvent, value: string): void => {
    setCurrentTab(value);
  };

  const searchParams = useSearchParams()
  const deviceName = searchParams.get('deviceName')
  const nodeId = searchParams.get('nodeId');

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
        {currentTab === 'connections' && <LoraEndPointConnectionTable
          deviceName={deviceName||''}
          nodeId={nodeId || '0'}
        />}
        {currentTab === 'config' && <LoRaDeviceConfiguration name={deviceName||''}/>}
      </Box>
    </QueryClientProvider>
  );
};

export default LoRaEndPointPage;
