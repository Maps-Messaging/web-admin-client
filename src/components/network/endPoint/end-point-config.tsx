/*
 * Copyright [ 2020 - 2024 ] [Matthew Buckton]
 * Copyright [ 2024 - 2024 ] [Maps Messaging B.V.]
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
import {useEffect, useState} from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {Accordion, AccordionDetails, AccordionSummary} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ProtocolConfigRenderer from "@/components/network/config/protocol/protocol-config-renderer";
import {EndPointConfigDTO, ProtocolConfigDTO} from "@/generated/model";
import NetworkConfigRenderer from "@/components/network/config/network/network-config-renderer";
import {useGetEndPoint} from "@/generated/server-interface-management/server-interface-management";

interface EndPointConfigurationProps {
  name: string;
}

export default function EndPointConfiguration({
                                                name = ''
                                              }: EndPointConfigurationProps): React.JSX.Element {

  const { data, error, isLoading } = useGetEndPoint(name || '', {
    query: {
      refetchInterval: 60000
    }
  });

  const [deviceConfig, setDeviceConfig] = useState<EndPointConfigDTO | null>(null);
  const [protocolConfigs, setProtocolConfigs] = useState<ProtocolConfigDTO[]>([]);

  useEffect(() => {
    if (data?.data.config) {
      setDeviceConfig(data.data.config.endPointConfig ?? null);
      setProtocolConfigs(data.data.config.protocolConfigs || []);
    }
  }, [data]);

  if (isLoading) return <div>Loading configuration...</div>;
  if (error) return <div>Error loading configuration: {error.message}</div>;

  const handleDeviceConfigChange = (updatedConfig: EndPointConfigDTO) => {
    setDeviceConfig(updatedConfig);
  };

  const handleProtocolConfigChange = (updatedConfig: ProtocolConfigDTO) => {
    setProtocolConfigs((prevConfigs) =>
      prevConfigs.map((config) =>
        config.type === updatedConfig.type ? updatedConfig : config
      )
    );
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Configuration</Typography>
          <Typography variant="h6">{data?.data.name}</Typography>
        </Stack>
      </Stack>

      {/* Device Configuration Accordion */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="device-config-content"
          id="device-config-header"
        >
          <Typography variant="h6" sx={{ width: '10%' }}>Device</Typography>
          <Typography variant="h6" sx={{ flexShrink: 0 }}>
            {`${deviceConfig?.type?.toUpperCase() || 'Unknown'} Configuration`}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {deviceConfig ? (
            <NetworkConfigRenderer
              config={deviceConfig}
              onChange={handleDeviceConfigChange}
            />
          ) : (
            <Typography>No device configuration available.</Typography>
          )}
        </AccordionDetails>
      </Accordion>

      {/* Protocol Configuration with Individual Protocol Accordions */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="protocol-config-content"
          id="protocol-config-header"
        >
          <Typography variant="h6" sx={{ width: '10%' }}>Protocol</Typography>
          <Typography variant="h6" sx={{ flexShrink: 0 }}>
            Protocol Configurations
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {protocolConfigs.length > 0 ? (
            protocolConfigs.map((config, index) => (
              <Accordion key={index.toString()}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`protocol-panel${index.toString()}-content`}
                  id={`protocol-panel${index.toString()}-header`}
                >
                  <Typography variant="subtitle1">
                    {`${config.type?.toUpperCase() || 'Unknown'} Protocol`}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ProtocolConfigRenderer
                    config={config}
                    onChange={handleProtocolConfigChange}
                  />
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            <Typography>No protocol configurations available.</Typography>
          )}
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
}
