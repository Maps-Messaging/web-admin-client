'use client';

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {
  useGetInterface,
} from "@/generated/server-interface-management/server-interface-management";
import ProtocolConfigRenderer from "@/components/network/config/protocol/protocol-config-renderer";
import { EndPointConfig, ProtocolConfig } from "@/generated/model";
import { useEffect, useState } from "react";
import NetworkConfigRenderer from "@/components/network/config/network/network-config-renderer";

interface EndPointConfigurationProps {
  name: string;
}

export default function EndPointConfiguration({
                                                name = ''
                                              }: EndPointConfigurationProps): React.JSX.Element {

  const { data, error, isLoading } = useGetInterface(name || '', {
    query: {
      refetchInterval: 60000
    }
  });

  const [deviceConfig, setDeviceConfig] = useState<EndPointConfig | null>(null);
  const [protocolConfigs, setProtocolConfigs] = useState<ProtocolConfig[]>([]);

  useEffect(() => {
    if (data?.data.config) {
      setDeviceConfig(data.data.config.endPointConfig ?? null);
      setProtocolConfigs(data.data.config.protocolConfigs || []);
    }
  }, [data]);

  if (isLoading) return <div>Loading configuration...</div>;
  if (error) return <div>Error loading configuration: {error.message}</div>;

  const handleDeviceConfigChange = (updatedConfig: EndPointConfig) => {
    setDeviceConfig(updatedConfig);
  };

  const handleProtocolConfigChange = (updatedConfig: ProtocolConfig) => {
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
