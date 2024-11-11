'use client';

import * as React from 'react';

import {LoRaDeviceConfigInfo} from "@/generated/model";
import { useEffect, useState } from "react";
import {useGetLoRaDeviceConfig} from "@/generated/lora-device-management/lora-device-management";
import LoRaDeviceConfigComponent from "@/components/network/config/lora/lora-device-config-component";

interface LoRaDeviceConfigProps {
  name: string;
}

export default function LoRaDeviceConfiguration({
                                                name = ''
                                              }: LoRaDeviceConfigProps): React.JSX.Element {

  const { data, error, isLoading } = useGetLoRaDeviceConfig(name || '', {
    query: {
      refetchInterval: 60000
    }
  });

  const [deviceConfig, setDeviceConfig] = useState<LoRaDeviceConfigInfo | null>(null);

  useEffect(() => {
    if (data?.data) {
      setDeviceConfig(data.data ?? null);
    }
  }, [data]);

  if (isLoading) return <div>Loading configuration...</div>;
  if (error) return <div>Error loading configuration: {error.message}</div>;

  const handleDeviceConfigChange = (updatedConfig: LoRaDeviceConfigInfo) => {
    setDeviceConfig(updatedConfig);
  };

  return (
    <LoRaDeviceConfigComponent
        config={deviceConfig || {}}
        onChange={handleDeviceConfigChange}
    />
  );
}
