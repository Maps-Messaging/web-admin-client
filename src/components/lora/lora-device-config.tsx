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

import {LoRaDeviceConfigInfoDTO} from "@/generated/model";
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

  const [deviceConfig, setDeviceConfig] = useState<LoRaDeviceConfigInfoDTO | null>(null);

  useEffect(() => {
    if (data?.data) {
      setDeviceConfig(data.data ?? null);
    }
  }, [data]);

  if (isLoading) return <div>Loading configuration...</div>;
  if (error) return <div>Error loading configuration: {error.message}</div>;

  const handleDeviceConfigChange = (updatedConfig: LoRaDeviceConfigInfoDTO) => {
    setDeviceConfig(updatedConfig);
  };

  return (
    <LoRaDeviceConfigComponent
        config={deviceConfig || {}}
        onChange={handleDeviceConfigChange}
    />
  );
}
