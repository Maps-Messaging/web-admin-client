import React from 'react';
import {MqttSnConfig} from "@/generated/model";

const MqttSnConfigComponent: React.FC<{ config: MqttSnConfig }> = ({ config }) => {
  return <div>Mqtt-SN Config: {config.type}</div>;
};

export default MqttSnConfigComponent;
