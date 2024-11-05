import React from 'react';
import {WebSocketConfig} from "@/generated/model";

const WebsocketConfigComponent: React.FC<{ config: WebSocketConfig }> = ({ config }) => {
  return <div>WebSocket Config: {config.type}</div>;
};

export default WebsocketConfigComponent;
