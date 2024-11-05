// LoraConfigComponent.tsx
import React from 'react';
import {LoRaConfig} from "@/generated/model";

const LoraConfigComponent: React.FC<{ config: LoRaConfig }> = ({ config }) => {
  return <div>LoRa Config: {config.type}</div>;
};

export default LoraConfigComponent;
