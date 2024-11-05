import React from 'react';
import {NmeaConfig} from "@/generated/model";

const NmeaConfigComponent: React.FC<{ config: NmeaConfig }> = ({ config }) => {
  return <div>NMEA Config: {config.type}</div>;
};

export default NmeaConfigComponent;
