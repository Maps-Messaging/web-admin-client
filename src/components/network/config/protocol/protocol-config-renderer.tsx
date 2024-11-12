/*
 * Copyright [ 2020 - 2024 ] [Matthew Buckton]
 * Copyright [ 2024 - 2024 ] [Maps Messaging]
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

// ProtocolConfigRenderer.tsx
import React from 'react';

import LoraConfigComponent from "@/components/network/config/protocol/lora-config-component";
import MqttConfigComponent from "@/components/network/config/protocol/mqtt-config-component";
import MqttV5ConfigComponent from "@/components/network/config/protocol/mqtt-v5-config-component";
import NmeaConfigComponent from "@/components/network/config/protocol/nmea-config-component";
import SemtechConfigComponent from "@/components/network/config/protocol/semtech-config-component";
import StompConfigComponent from "@/components/network/config/protocol/stomp-config-component";
import WebsocketConfigComponent from "@/components/network/config/protocol/websocket-config-component";
import AmqpConfigComponent from "@/components/network/config/protocol/amqp-config-component";
import CoapConfigComponent from "@/components/network/config/protocol/coap-config-component";
import {
  AmqpConfig,
  CoapConfig,
  LoRaConfig,
  MqttConfig,
  MqttSnConfig,
  MqttV5Config,
  NmeaConfig,
  ProtocolConfig,
  SemtechConfig,
  StompConfig,
  WebSocketConfig
} from "@/generated/model";
import MqttSnConfigComponent from "@/components/network/config/protocol/mqtt-sn-config-component";

interface ProtocolConfigRendererProps {
  config: ProtocolConfig;
  onChange: (updatedConfig: ProtocolConfig) => void;
}

// Define type guards for each specific config type
function isAmqpConfig(config: ProtocolConfig): config is AmqpConfig {
  return config.type === 'amqp';
}

function isCoapConfig(config: ProtocolConfig): config is CoapConfig {
  return config.type === 'coap';
}

function isMqttSnConfig(config: ProtocolConfig): config is MqttSnConfig {
  return config.type === 'mqtt-sn';
}

// Continue with similar type guards for each protocol type
function isLoraConfig(config: ProtocolConfig): config is LoRaConfig {
  return config.type === 'lora';
}
function isMqttConfig(config: ProtocolConfig): config is MqttConfig {
  return config.type === 'mqtt';
}
function isMqttV5Config(config: ProtocolConfig): config is MqttV5Config {
  return config.type === 'mqtt-v5';
}
function isNmeaConfig(config: ProtocolConfig): config is NmeaConfig {
  return config.type === 'nmea';
}
function isSemtechConfig(config: ProtocolConfig): config is SemtechConfig {
  return config.type === 'semtech';
}
function isStompConfig(config: ProtocolConfig): config is StompConfig {
  return config.type === 'stomp';
}
function isWebSocketConfig(config: ProtocolConfig): config is WebSocketConfig {
  return config.type === 'websocket';
}

const ProtocolConfigRenderer:React.FC<ProtocolConfigRendererProps> = ({ config, onChange })  => {
  if (isAmqpConfig(config)) {
    return <AmqpConfigComponent
      config={config}
      onChange={onChange}
    />;
  } else if (isCoapConfig(config)) {
    return <CoapConfigComponent config={config} />;
  } else if (isLoraConfig(config)) {
    return <LoraConfigComponent config={config} />;
  } else if (isMqttConfig(config)) {
    return <MqttConfigComponent
      config={config}
      onChange={onChange}
    />;
  } else if (isMqttV5Config(config)) {
    return <MqttV5ConfigComponent
      config={config}
      onChange={onChange}
    />;
  } else if (isMqttSnConfig(config)) {
    return <MqttSnConfigComponent config={config} />;
  } else if (isNmeaConfig(config)) {
    return <NmeaConfigComponent config={config} />;
  } else if (isSemtechConfig(config)) {
    return <SemtechConfigComponent config={config} />;
  } else if (isStompConfig(config)) {
    return <StompConfigComponent
      config={config}
      onChange={onChange}
    />;
  } else if (isWebSocketConfig(config)) {
    return <WebsocketConfigComponent config={config} />;
  } else {
    return <div>Unknown Protocol Type</div>;
  }
};

export default ProtocolConfigRenderer;
