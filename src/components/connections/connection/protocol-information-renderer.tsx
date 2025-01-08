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

// ProtocolConfigRenderer.tsx
import React from 'react';

import {
  AmqpProtocolInformation,
  CoapProtocolInformation,
  EndPointDetailsDTO,
  LoraProtocolInformation,
  MqttSnProtocolInformation,
  MqttV5ProtocolInformation,
  NmeaProtocolInformation,
  ProtocolInformationDTO, RestProtocolInformation,
  SemtechProtocolInformation,
  StompProtocolInformation
} from "@/generated/model";
import SessionInfoDetails from "@/components/connections/connection/session-info-details";

interface ProtocolInformationRendererProps {
  endPointDetails: EndPointDetailsDTO;
  protocol: ProtocolInformationDTO;
}

// Define type guards for each specific config type
function isAMQPProtocol(config: ProtocolInformationDTO): config is AmqpProtocolInformation {
  return config.type === 'amqp';
}

function isCoapProtocol(config: ProtocolInformationDTO): config is CoapProtocolInformation {
  return config.type === 'coap';
}

function isMqttSnProtocol(config: ProtocolInformationDTO): config is MqttSnProtocolInformation {
  return config.type === 'mqtt-sn';
}

// Continue with similar type guards for each protocol type
function isLoraProtocol(config: ProtocolInformationDTO): config is LoraProtocolInformation {
  return config.type === 'lora';
}

function isMqttProtocol(config: ProtocolInformationDTO): config is MqttSnProtocolInformation {
  return config.type === 'mqtt';
}

function isMqttV5Protocol(config: ProtocolInformationDTO): config is MqttV5ProtocolInformation {
  return config.type === 'mqttV5';
}

function isNmeaProtocol(config: ProtocolInformationDTO): config is NmeaProtocolInformation {
  return config.type === 'nmea';
}

function isSemtechProtocol(config: ProtocolInformationDTO): config is SemtechProtocolInformation {
  return config.type === 'semtech';
}

function isStompProtocol(protocol: ProtocolInformationDTO): protocol is StompProtocolInformation {
  return protocol.type === 'stomp';
}

function isRestProtocol(protocol: ProtocolInformationDTO): protocol is RestProtocolInformation {
  return protocol.type === 'rest';
}

const ProtocolInformationRenderer:React.FC<ProtocolInformationRendererProps> = ({ protocol, endPointDetails })  => {
  if (isAMQPProtocol(protocol)) {
    return (<div>Not yet implemented</div>);
  } else if (isCoapProtocol(protocol)) {
    return <SessionInfoDetails
      sessionInfo={protocol.sessionInfo || {}}
      endPointDetails={endPointDetails}
    />;
  } else if (isLoraProtocol(protocol)) {
    return <SessionInfoDetails
      sessionInfo={protocol.sessionInfo || {}}
      endPointDetails={endPointDetails}
    />;
  } else if (isMqttProtocol(protocol)) {
    return <SessionInfoDetails
      sessionInfo={protocol.sessionInfo || {}}
      endPointDetails={endPointDetails}
    />;
  } else if (isMqttV5Protocol(protocol)) {
    return <SessionInfoDetails
      sessionInfo={protocol.sessionInfo || {}}
      endPointDetails={endPointDetails}
    />;
  } else if (isMqttSnProtocol(protocol)) {
    return <SessionInfoDetails
      sessionInfo={protocol.sessionInfo || {}}
      endPointDetails={endPointDetails}
    />;
  } else if (isNmeaProtocol(protocol)) {
    return <SessionInfoDetails
      sessionInfo={protocol.sessionInfo || {}}
      endPointDetails={endPointDetails}
    />;
  } else if (isSemtechProtocol(protocol)) {
    return <SessionInfoDetails
      sessionInfo={protocol.sessionInfo || {}}
      endPointDetails={endPointDetails}
    />;
  } else if (isStompProtocol(protocol)) {
    return <SessionInfoDetails
      sessionInfo={protocol.sessionInfo || {}}
      endPointDetails={endPointDetails}
    />;
  } else if (isRestProtocol(protocol)) {
    return <SessionInfoDetails
      sessionInfo={protocol.sessionInfo || {}}
      endPointDetails={endPointDetails}
    />;
  }
};

export default ProtocolInformationRenderer;
