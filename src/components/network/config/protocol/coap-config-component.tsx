// CoapConfigComponent.tsx
import React from 'react';
import {CoapConfig} from "@/generated/model";

const CoapConfigComponent: React.FC<{ config: CoapConfig }> = ({ config }) => {
  return <div>Coap Config: {config.type}</div>;
};

export default CoapConfigComponent;
