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

// InterfaceConfigRenderer.tsx
import React from 'react';

import {
  EndPointConfig,
  UdpConfig,
  TcpConfig,
  TlsConfig,
  DtlsConfig,
  SerialConfig,
  LoRaConfig
} from "@/generated/model";
import UdpConfigComponent from "@/components/network/config/network/udp-config-component";
import TcpConfigComponent from "@/components/network/config/network/tcp-config-component";
import TlsConfigComponent from "@/components/network/config/network/tls-config-component";
import DtlsConfigComponent from "@/components/network/config/network/DtlsConfigComponent";
import SerialConfigComponent from "@/components/network/config/network/serial-config-component";
import LoRaConfigComponent from "@/components/network/config/network/lora-config-renderer"; // Adjust import path as necessary

interface InterfaceConfigRendererProps {
  config: EndPointConfig;
  onChange: (updatedConfig: EndPointConfig) => void;
}

// Define type guards for each specific config type
function isUdpConfig(config: EndPointConfig): config is UdpConfig {
  return config.type === 'udp';
}

function isTcpConfig(config: EndPointConfig): config is TcpConfig {
  return config.type === 'tcp';
}

function isTlsConfig(config: EndPointConfig): config is TlsConfig {
  return config.type === 'tls';
}

function isDtlsConfig(config: EndPointConfig): config is DtlsConfig {
  return config.type === 'dtls';
}

function isSerialConfig(config: EndPointConfig): config is SerialConfig {
  return config.type === 'serial';
}

function isLoraConfig(config: EndPointConfig): config is LoRaConfig {
  return config.type === 'lora';
}

const InterfaceConfigRenderer: React.FC<InterfaceConfigRendererProps> = ({ config, onChange }) => {
  if (isUdpConfig(config)) {
    return <UdpConfigComponent
      config={config}
      onChange={onChange}
    />;
  } else if (isTcpConfig(config)) {
    return <TcpConfigComponent
      config={config}
      onChange={onChange}
    />;
  } else if (isTlsConfig(config)) {
    return <TlsConfigComponent
      config={config}
      onChange={onChange}
    />;
  } else if (isDtlsConfig(config)) {
    return <DtlsConfigComponent
      config={config}
      onChange={onChange}
    />;
  } else if (isSerialConfig(config)) {
    return <SerialConfigComponent
      config={config}
      onChange={onChange}
    />;
  } else if (isLoraConfig(config)) {
    return <LoRaConfigComponent
      config={config}
      onChange={onChange}
    />;
  } else {
    return <div>Unknown Interface Type</div>;
  }
};

export default InterfaceConfigRenderer;
