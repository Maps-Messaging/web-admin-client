'use client';

import * as React from 'react';
import { useGetAllLoRaDevices } from "@/generated/lora-device-management/lora-device-management";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper, Tabs, Tab
} from '@mui/material';
import {LoRaDeviceInfoDTO, LoRaEndPointInfoDTO} from "@/generated/model";
import LoRaEndPointInfoTable from "@/components/lora/lora-end-point-info-table";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import LoRaDeviceConfiguration from "@/components/lora/lora-device-config";

const tabs = [
  {
    label: 'Devices',
    value: 'devices'
  },
  {
    label: 'Configuration',
    value: 'configuration'
  }
];

const queryClient = new QueryClient();

function LoRaDeviceDetailsInner(): React.JSX.Element {
  const [currentTab, setCurrentTab] = useState<string>('devices');
  const { data, error, isLoading } = useGetAllLoRaDevices();

  const handleTabsChange = (event: React.SyntheticEvent, value: string): void => {
    setCurrentTab(value);
  };

  if (isLoading) return <div>Loading devices...</div>;
  if (error) return <div>Error loading devices: {error.message}</div>;

  return (
    <Box sx={{ mt: 3 }}>
      <Container>
        <Typography variant="h4" gutterBottom>LoRa Device Overview</Typography>
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
            <Tab
              key={tab.value}
              label={tab.label}
              value={tab.value}
            />
          ))}
        </Tabs>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Device Name</TableCell>
                <TableCell>Radio</TableCell>
                <TableCell>Packets Received</TableCell>
                <TableCell>Packets Sent</TableCell>
                <TableCell>Bytes Received</TableCell>
                <TableCell>Bytes Sent</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data.data?.map((device: LoRaDeviceInfoDTO) => (
                <React.Fragment key={device.name}>
                  <TableRow>
                    <TableCell>{device.name}</TableCell>
                    <TableCell>{device.radio}</TableCell>
                    <TableCell>{device.packetsReceived}</TableCell>
                    <TableCell>{device.packetsSent}</TableCell>
                    <TableCell>{device.bytesReceived}</TableCell>
                    <TableCell>{device.bytesSent}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={6}>
                      {currentTab === 'configuration' && <LoRaDeviceConfiguration name={device?.name || ''} />}
                      {currentTab === 'devices' &&
                        <LoRaEndPointInfoTable
                          endPoints={device?.endPointInfoList || [] as LoRaEndPointInfoDTO[]}
                          deviceName={device.name || ''}
                        />
                      }
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}

export default function LoRaDeviceDetails() {
  return (
    <QueryClientProvider client={queryClient}>
      <LoRaDeviceDetailsInner />
    </QueryClientProvider>
  );
}
