// InterfaceConfigRenderer.tsx
import React from 'react';

import {
  EndPointConfig,
  UdpConfig,
  TcpConfig,
  TlsConfig,
  DtlsConfig,
  SerialConfig,
  LoRaDeviceConfig
} from "@/generated/model";
import UdpConfigComponent from "@/components/network/config/network/udp-config-component";
import TcpConfigComponent from "@/components/network/config/network/tcp-config-component";
import TlsConfigComponent from "@/components/network/config/network/tls-config-component";
import DtlsConfigComponent from "@/components/network/config/network/DtlsConfigComponent";
import LoRaDeviceConfigComponent from "@/components/network/config/network/lora-device-config-component";
import SerialConfigComponent from "@/components/network/config/network/serial-config-component"; // Adjust import path as necessary

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

function isLoRaDeviceConfig(config: EndPointConfig): config is LoRaDeviceConfig {
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
  } else if (isLoRaDeviceConfig(config)) {
    return <LoRaDeviceConfigComponent
      config={config}
      onChange={onChange}
    />;
  } else {
    return <div>Unknown Interface Type</div>;
  }
};

export default InterfaceConfigRenderer;
