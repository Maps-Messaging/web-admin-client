import * as React from "react";
import Typography from "@mui/material/Typography";

interface DeviceInfoStateDialogProps {
  stateString?: string;
}

export function DeviceInfoStateDialog({ stateString }: DeviceInfoStateDialogProps) {
  if (!stateString) {
    return null;
  }

  let parsedState: Record<string, any> | null = null;
  try {
    parsedState = JSON.parse(stateString);
  } catch {
    parsedState = null;
  }

  return (
    <div>
      {parsedState ? (
        Object.entries(parsedState).map(([key, value]) => (
          <Typography key={key} sx={{ my: 1 }}>
            <strong>{key}:</strong> {String(value)}
          </Typography>
        ))
      ) : (
        <Typography>Invalid or empty state</Typography>
      )}
    </div>

  );

}
