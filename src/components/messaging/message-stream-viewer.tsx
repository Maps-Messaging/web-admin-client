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
import Typography from "@mui/material/Typography";
import {MessageDTO} from "@/generated/model";

interface MessageStreamViewerProps {
  destination: string;
}

const MessageStreamViewer: React.FC<MessageStreamViewerProps> = ({ destination }) => {
  const [messages, setMessages] = useState<MessageDTO[]>([]); // Store received messages
  const messageContainerRef = useRef<HTMLDivElement | null>(null); // Auto-scroll reference

  // Decode Base64 payload
  const decodeBase64 = (base64: string): string => {
    try {
      return atob(base64); // Decode Base64 string
    } catch (error) {
      return "[Invalid Base64 Payload]";
    }
  };

  useEffect(() => {
    const baseUrl = process.env.API_BASE_URL || '';
    const url = `${baseUrl}/api/v1/messaging/sse?destination=${encodeURIComponent(destination)}`;
    const eventSource = new EventSource(url);

    eventSource.addEventListener(destination, (event: MessageEvent) => {
      try {
        const data = event.data as string;
        const message: MessageDTO = JSON.parse(data) as MessageDTO;
        setMessages((prevMessages) => {
          const updatedMessages = [message, ...prevMessages];
          return updatedMessages.slice(0, 20);
        });
      } catch (error) {
        // Not much we can do here
      }
    });

    // Cleanup on unmount
    return () => {
      eventSource.close();
    };
  }, [destination]);

  useEffect(() => {
    // Auto-scroll to the bottom of the message view
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div style={styles.container}>
      <Typography variant="h6" align="center" gutterBottom>
        Message Stream Viewer
      </Typography>
      <div style={styles.messageWindow}>
        {messages.map((message, index) => (
          <div key={index} style={styles.message}>
            <Typography variant="body2" style={{color: "#00FFFF"}}>
              Identifier: {message?.identifier}  Creation: {message?.creation || ''}
            </Typography>
            <Typography variant="body2" style={{color: "#0f0"}}>
              Payload: {decodeBase64(message.payload)}
            </Typography>
            {message.dataMap && (
              <Typography variant="body2" style={{color: "#aaa"}}>
                Data Map: {JSON.stringify(message.dataMap)}
              </Typography>
            )}
            {message.dataMap && (
              <Typography variant="body2" style={{color: "#aaa"}}>
                Meta Data: {JSON.stringify(message.metaData)}
              </Typography>
            )}
            <hr style={styles.horizontalLine}/>
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
    backgroundColor: "#000", // Black background for the container
    padding: "10px",
  },
  messageWindow: {
    height: "600px",
    overflowX: "auto" as const,
    backgroundColor: "#000", // Black background for the message window
    padding: "10px",
  },
  message: {
    padding: "10px 0",
  },
  horizontalLine: {
    border: "none",
    borderBottom: "1px solid #444", // Subtle gray line
    margin: "10px 0",
  },
};
export default MessageStreamViewer;
