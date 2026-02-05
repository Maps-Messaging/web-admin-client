/*
 * Copyright [ 2020 - 2024 ] [Matthew Buckton]
 * Copyright [ 2024 - 2026 ] [Maps Messaging B.V.]
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
