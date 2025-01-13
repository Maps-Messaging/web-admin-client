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
import {LogEntry, MessageDTO} from "@/generated/model";

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
      console.error("Failed to decode Base64 payload:", error);
      return "[Invalid Base64 Payload]";
    }
  };

  useEffect(() => {
    const url = `${process.env.API_BASE_URL}/api/v1/messaging/sse?destination=${encodeURIComponent(destination)}`;
    const eventSource = new EventSource(url);

    eventSource.addEventListener(destination, (event) => {
      const message: MessageDTO = JSON.parse(event.data); // Parse the log entry
      setMessages((prevMessages) => [message, ...prevMessages]);
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
      <div style={styles.messageWindow} ref={messageContainerRef}>
        {messages.map((message, index) => (
          <div key={index} style={styles.message}>
            <Typography variant="body2" style={{ color: "#0f0" }}>
              Payload: {decodeBase64(message.payload)}
            </Typography>
            {message.dataMap && (
              <Typography variant="body2" style={{ color: "#aaa" }}>
                Data Map: {JSON.stringify(message.dataMap)}
              </Typography>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    maxWidth: "900px",
    margin: "0 auto",
    border: "1px solid #ccc",
    borderRadius: "5px",
    overflow: "hidden",
    backgroundColor: "#000", // Dark background for log viewer aesthetic
  },
  messageWindow: {
    height: "600px",
    overflowY: "scroll" as const,
    overflowX: "auto" as const,
    backgroundColor: "#000",
    padding: "10px",
  },
  message: {
    marginBottom: "10px",
    padding: "5px",
    backgroundColor: "#111", // Slightly lighter background for contrast
    borderRadius: "4px",
  },
};

export default MessageStreamViewer;
