'use client';

import React, { useEffect, useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import type { LogEntry } from "@/generated/model";

const LogViewer: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [level, setLevel] = useState<number>(0);
  const [textFilter, setTextFilter] = useState<string>("");
  const logContainerRef = useRef<HTMLDivElement | null>(null);
  const [filter, setFilter] = useState<string>("");

  // Function to get the color based on the severity level
  const getColorForLevel = (logLevel: number): string => {
    switch (logLevel) {
      case 40000: // ERROR
        return "#FF0000"; // Red
      case 30000: // WARN
        return "#FFFF00"; // Yellow
      case 20000: // INFO
        return "#00FF00"; // Green
      case 10000: // DEBUG
        return "#00FFFF"; // Cyan
      case 5000: // TRACE
        return "#AAAAAA"; // Gray
      default:
        return "#FFFFFF"; // Default white for unknown levels
    }
  };

  const buildFilter = (): void => {
    let query = "";
    if (level > 0) {
      query += `level >= ${level.toString()}`; // Explicitly convert `level` to a string
    }
    if (textFilter.trim() !== "") {
      if (query) query += " AND ";
      query += `message LIKE '%${textFilter.trim()}%'`;
    }
    setFilter(query);
  };

  useEffect(() => {
    const baseUrl = process.env.API_BASE_URL || '';
    const url = `${baseUrl}/api/v1/server/log/sse?filter=${encodeURIComponent(filter)}`;
    const eventSource = new EventSource(url);

    eventSource.addEventListener("logEvent", (event: MessageEvent) => {
      try {
        const data = event.data as string; // Ensure event.data is treated as a string
        const logEntry: LogEntry = JSON.parse(data) as LogEntry; // Explicitly type the parsed object
        setLogs((prevLogs) => [...prevLogs, logEntry]);
      } catch (error) {
        // not much we can do here
      }
    });


    // Cleanup SSE connection on unmount
    return () => {
      eventSource.close();
    };
  }, [filter]);

  useEffect(() => {
    // Auto-scroll to the bottom of the log view
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
            setTextFilter(e.target.value)
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
              color: getColorForLevel(log.level || 0), // Apply color based on severity
              fontFamily: "monospace",
              padding: 0, // No padding
              margin: 0, // No margin
              lineHeight: 1, // Tighter line height
              whiteSpace: "nowrap", // Prevent text wrapping
              backgroundColor: index % 6 < 3 ? "#000" : "#004400", // Alternate background
            }}
          >
            {log.message}
          </Typography>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    maxWidth: "900px", // Increased size for the container
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
    height: "600px", // Increased height for the log window
    overflowY: "scroll" as const,
    overflowX: "auto" as const, // Enable horizontal scrolling
    backgroundColor: "#000",
    padding: "10px",
  },
};

export default LogViewer;
