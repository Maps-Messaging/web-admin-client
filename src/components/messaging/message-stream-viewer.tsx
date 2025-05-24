/*
 * Copyright [ 2020 - 2024 ] [Matthew Buckton]
 * Copyright [ 2024 - 2025 ] [Maps Messaging B.V.]
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

'use client';

import React, { useEffect, useRef, useState } from "react";
import { JSX } from "react";
import Typography from "@mui/material/Typography";
import type { AsyncMessageDTO } from "@/generated/model";
import { useRequestSseMessageToken } from "@/generated/messaging-interface/messaging-interface";

interface MessageStreamViewerProps {
  destination: string;
}

function MessageStreamViewer({ destination }: MessageStreamViewerProps): JSX.Element {
  const [messages, setMessages] = useState<AsyncMessageDTO[]>([]);
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  const decodeBase64 = (base64: string): string => {
    try {
      return atob(base64);
    } catch {
      return "[Invalid Base64 Payload]";
    }
  };

  const { data: tokenResponse, isSuccess } = useRequestSseMessageToken({ destination });

  useEffect(() => {
    if (!isSuccess || typeof tokenResponse?.data !== 'string') return;

    const baseUrl = process.env.API_BASE_URL || '';
    if (!isSuccess || typeof tokenResponse?.data !== 'string') return;
    const token: string = tokenResponse.data;
    const sseUrl = `${baseUrl}/api/v1/messaging/sse/stream/${encodeURIComponent(token)}?destinationName=${encodeURIComponent(destination)}`;
    const eventSource = new EventSource(sseUrl);


    eventSource.addEventListener(destination, (event: MessageEvent<string>) => {
      try {
        const message :AsyncMessageDTO = JSON.parse(event.data) as AsyncMessageDTO;

        setMessages(prev => [message, ...prev].slice(0, 20));
      } catch {
        // silently ignore
      }
    });

    return () => {
      eventSource.close();
    };
  }, [isSuccess, tokenResponse?.data, destination]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div style={styles.container}>
      <div style={styles.messageWindow} ref={messageContainerRef}>
        {messages.map((message, index) => (
          <div key={index} style={styles.message}>
            <Typography variant="body2" style={{ color: "#00FFFF" }}>
              Identifier: {message?.identifier} Creation: {message?.creation || ''} Name: {message?.destinationName || ''}
            </Typography>
            <Typography variant="body2" style={{ color: "#0f0" }}>
              Payload: {decodeBase64(message.payload)}
            </Typography>
            {message.dataMap && (
              <Typography variant="body2" style={{ color: "#aaa" }}>
                Data Map: {JSON.stringify(message.dataMap)}
              </Typography>
            )}
            {message.metaData && (
              <Typography variant="body2" style={{ color: "#aaa" }}>
                Meta Data: {JSON.stringify(message.metaData)}
              </Typography>
            )}
            <hr style={styles.horizontalLine} />
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    maxWidth: "900px",
    margin: "0 auto",
    border: "1px solid #ccc",
    borderRadius: "5px",
    overflow: "hidden",
    backgroundColor: "#000",
    padding: "10px",
  },
  messageWindow: {
    height: "600px",
    overflowX: "auto" as const,
    backgroundColor: "#000",
    padding: "10px",
  },
  message: {
    padding: "10px 0",
  },
  horizontalLine: {
    border: "none",
    borderBottom: "1px solid #444",
    margin: "10px 0",
  },
};

export default MessageStreamViewer;
