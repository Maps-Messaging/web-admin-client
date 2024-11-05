import React from 'react';
import {SemtechConfig} from "@/generated/model";

const SemtechConfigComponent: React.FC<{ config: SemtechConfig }> = ({ config }) => {
  return <div>Semtech Config: {config.type}</div>;
};

export default SemtechConfigComponent;
