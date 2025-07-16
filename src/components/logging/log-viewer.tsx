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
 */

'use client';

import React, {type JSX, useEffect, useRef, useState} from "react";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import type {LogEntry} from "@/generated/model";
import {requestSseToken} from "@/generated/logging-monitor/logging-monitor";

function LogViewer(): JSX.Element {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [level, setLevel] = useState<number>(0);
  const [textFilter, setTextFilter] = useState<string>("");
  const logContainerRef = useRef<HTMLDivElement | null>(null);
  const [filter, setFilter] = useState<string>("");

  const getColorForLevel = (logLevel: number): string => {
    switch (logLevel) {
      case 40000: return "#FF0000";
      case 30000: return "#FFFF00";
      case 20000: return "#00FF00";
      case 10000: return "#00FFFF";
      case 5000: return "#AAAAAA";
      default: return "#FFFFFF";
    }
  };

  const buildFilter = (): void => {
    let query = "";
    if (level > 0) {
      query += `level >= ${String(level)}`;
    }
    if (textFilter.trim()) {
      if (query) query += " AND ";
      query += `message LIKE '%${textFilter.trim()}%'`;
    }
    setFilter(query);
  };

  useEffect(() => {
    let eventSource: EventSource | null = null;

    const connectWithToken = async (): Promise<void> => {
      try {
        const response = await requestSseToken({ withCredentials: true });
        if (typeof response.data !== "string") return;
        const token: string = response.data;

        const baseUrl = process.env.API_BASE_URL || "";
        const url = `${baseUrl}/api/v1/server/log/sse/stream/${token}?filter=${encodeURIComponent(filter)}`;

        eventSource = new EventSource(url, { withCredentials: true });

        eventSource.addEventListener("logEvent", (event: MessageEvent<string>) => {
          try {
            const logEntry:LogEntry = JSON.parse(event.data) as LogEntry;
            setLogs((prev) => {
              return [...prev, logEntry];
            });
          } catch {
            // Ignore parse errors
          }
        });
      } catch (error) {
        // Log fetch error – replace with proper logging if needed
        // console.error("SSE token fetch failed:", error);
      }
    };

    void connectWithToken();

    return () => {
      eventSource?.close();
    };
  }, [filter]);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div style={styles.container}>
      <div style={styles.filterContainer}>
        <Tooltip title="Select the log level. Includes all higher levels." arrow>
          <Select
            value={level}
            onChange={(e) => {
              setLevel(Number(e.target.value));
            }}
            displayEmpty
            style={styles.dropdown}
          >
            <MenuItem value={0}>All Levels</MenuItem>
            <MenuItem value={5000}>TRACE</MenuItem>
            <MenuItem value={10000}>DEBUG</MenuItem>
            <MenuItem value={20000}>INFO</MenuItem>
            <MenuItem value={30000}>WARN</MenuItem>
            <MenuItem value={40000}>ERROR</MenuItem>
          </Select>
        </Tooltip>
        <TextField
          label="Message Filter"
          variant="outlined"
          size="small"
          value={textFilter}
          onChange={(e) => {
            setTextFilter(e.target.value);
          }}
          style={styles.textField}
        />
        <Button variant="contained" color="primary" onClick={buildFilter}>
          Apply Filter
        </Button>
      </div>
      <div style={styles.logWindow} ref={logContainerRef}>
        {logs.map((log, index) => (
          <Typography
            key={log.logNumber}
            variant="body2"
            component="div"
            sx={{
              color: getColorForLevel(log.level || 0),
              fontFamily: "monospace",
              padding: 0,
              margin: 0,
              lineHeight: 1,
              whiteSpace: "nowrap",
              backgroundColor: index % 6 < 3 ? "#000" : "#004400",
            }}
          >
            {log.message}
          </Typography>
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
  },
  filterContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px",
    backgroundColor: "#f4f4f4",
    borderBottom: "1px solid #ccc",
  },
  dropdown: {
    width: "150px",
  },
  textField: {
    flex: 1,
  },
  logWindow: {
    height: "600px",
    overflowY: "scroll" as const,
    overflowX: "auto" as const,
    backgroundColor: "#000",
    padding: "10px",
  },
};

export default LogViewer;
