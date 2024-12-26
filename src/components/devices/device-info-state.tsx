import * as React from "react";
import Typography from "@mui/material/Typography";

interface DeviceInfoStateDialogProps {
  stateString?: string;
}

type DeviceInfoState = Record<string, unknown>;

export function DeviceInfoStateDialog({ stateString }: DeviceInfoStateDialogProps): React.JSX.Element {
  if (!stateString) {
    // Self-closing for empty element
    return <div />;
  }

  let parsedState: DeviceInfoState | null;
  try {
    parsedState = JSON.parse(stateString) as DeviceInfoState;
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
