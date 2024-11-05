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
import {ProtocolConfig} from "@/generated/model";
import {useEffect, useState} from "react";

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

  const [protocolConfigs, setProtocolConfigs] = useState<ProtocolConfig[]>([]);
  useEffect(() => {
    // Initialize protocol configs when data is fetched
    if (data?.data.config?.protocolConfigs) {
      setProtocolConfigs(data.data.config.protocolConfigs);
    }
  }, [data]);

  if (isLoading) return <div>Loading name...</div>;
  if (error) return <div>Error loading name: {error.message}</div>;

  const handleConfigChange = (updatedConfig: ProtocolConfig) => {
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

      <div>
        {protocolConfigs?.map((config, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index.toString()}-content`}
              id={`panel${index.toString()}-header`}
            >
              <Typography variant="h6">
                {`${typeof config.type === 'string' ? config.type.toUpperCase() : 'Unknown'} Configuration`}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ProtocolConfigRenderer
                config={config}
                onChange={handleConfigChange}
              />
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </Stack>
  );
}
