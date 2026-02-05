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

// ProtocolConfigRenderer.tsx
import React from 'react';

import MqttConfigComponent from "@/components/network/config/protocol/mqtt-config-component";
import NmeaConfigComponent from "@/components/network/config/protocol/nmea-config-component";
import SemtechConfigComponent from "@/components/network/config/protocol/semtech-config-component";
import StompConfigComponent from "@/components/network/config/protocol/stomp-config-component";
import WebsocketConfigComponent from "@/components/network/config/protocol/websocket-config-component";
import AmqpConfigComponent from "@/components/network/config/protocol/amqp-config-component";
import CoapConfigComponent from "@/components/network/config/protocol/coap-config-component";
import {
  AmqpConfigDTO,
  CoapConfigDTO,
  ExtensionConfigDTO,
  LoRaProtocolConfigDTO,
  MqttConfigDTO,
  MqttSnConfigDTO,
  NmeaConfigDTO,
  ProtocolConfigDTO,
  SemtechConfigDTO,
  StompConfigDTO,
  WebSocketConfigDTO
} from "@/generated/model";
import MqttSnConfigComponent from "@/components/network/config/protocol/mqtt-sn-config-component";
import ExtensionConfigComponent from "@/components/network/config/protocol/extension-config-component";
import LoraConfigComponent from "@/components/network/config/protocol/lora-config-component";

interface ProtocolConfigRendererProps {
  config: ProtocolConfigDTO;
  onChange: (updatedConfig: ProtocolConfigDTO) => void;
}

function isAmqpConfig(config: ProtocolConfigDTO): config is AmqpConfigDTO {
  return config.type === 'amqp';
}
function isCoapConfig(config: ProtocolConfigDTO): config is CoapConfigDTO {
  return config.type === 'coap';
}
function isMqttSnConfig(config: ProtocolConfigDTO): config is MqttSnConfigDTO {
  return config.type === 'mqtt-sn';
}
function isLoraConfig(config: ProtocolConfigDTO): config is LoRaProtocolConfigDTO {
  return config.type === 'lora';
}
function isMqttConfig(config: ProtocolConfigDTO): config is MqttConfigDTO {
  return config.type === 'mqtt';
}
function isNmeaConfig(config: ProtocolConfigDTO): config is NmeaConfigDTO {
  return config.type === 'NMEA-0183';
}
function isSemtechConfig(config: ProtocolConfigDTO): config is SemtechConfigDTO {
  return config.type === 'semtech';
}
function isStompConfig(config: ProtocolConfigDTO): config is StompConfigDTO {
  return config.type === 'stomp';
}
function isWebSocketConfig(config: ProtocolConfigDTO): config is WebSocketConfigDTO {
  return config.type === 'ws';
}
function isExtensionConfig(config: ProtocolConfigDTO): config is ExtensionConfigDTO {
  return config.type === 'extension';
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
  }
 else if (isExtensionConfig(config)) {
    return <ExtensionConfigComponent config={config} />;
  }else {
    return <div>Unknown Protocol Type</div>;
  }
};

export default ProtocolConfigRenderer;
