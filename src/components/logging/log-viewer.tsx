'use client';

import React, { useEffect, useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { LogEntry } from "@/generated/model";

const LogViewer: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]); // Store log entries
  const [level, setLevel] = useState<number>(0); // Selected log level filter
  const [textFilter, setTextFilter] = useState<string>(""); // Message text filter
  const logContainerRef = useRef<HTMLDivElement | null>(null); // Reference to the log container for auto-scrolling
  const [filter, setFilter] = useState<string>(""); // Combined filter query

  // Function to get the color based on the severity level
  const getColorForLevel = (level: number): string => {
    switch (level) {
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

  // Function to construct the filter query
  const buildFilter = () => {
    let query = "";
    if (level > 0) {
      query += `level >= ${level}`;
    }
    if (textFilter.trim() !== "") {
      if (query) query += " AND ";
      query += `message LIKE '%${textFilter.trim()}%'`; // Use LIKE for partial match
    }
    setFilter(query);
  };

  useEffect(() => {
    const url = `${process.env.API_BASE_URL}/api/v1/server/log/sse?filter=${encodeURIComponent(filter)}`;
    const eventSource = new EventSource(url);

    // Event handler for logEvent
    eventSource.addEventListener("logEvent", (event) => {
      const logEntry: LogEntry = JSON.parse(event.data); // Parse the log entry
      setLogs((prevLogs) => [...prevLogs, logEntry]); // Append new log entry
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
            onChange={(e) => setLevel(Number(e.target.value))}
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
          onChange={(e) => setTextFilter(e.target.value)}
          style={styles.textField}
        />
        <Button variant="contained" color="primary" onClick={buildFilter}>
          Apply Filter
        </Button>
      </div>
      <div style={styles.logWindow} ref={logContainerRef}>
        {logs.map((log, index) => (
          <Typography
            key={index}
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
