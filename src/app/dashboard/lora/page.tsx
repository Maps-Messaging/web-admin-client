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
import {useGetAllLoRaDevices} from "@/generated/lora-device-management/lora-device-management";
import {
  Container,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography
} from '@mui/material';
import {LoRaDeviceInfoDTO, LoRaEndPointInfoDTO} from "@/generated/model";
import LoRaEndPointInfoTable from "@/components/lora/lora-end-point-info-table";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
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
              {data?.data?.map((device: LoRaDeviceInfoDTO) => (
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
