// LoRaDeviceRow.tsx

import type { LoRaDeviceInfo } from "@/generated/model";
import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

interface LoRaDeviceRowProps {
  key: string;
  deviceInfo: LoRaDeviceInfo;
}

export function LoRaDeviceRow({ deviceInfo, key = '' }: LoRaDeviceRowProps): React.JSX.Element {
  return (
    <TableRow id={key}>
      <TableCell>
        <Typography variant="subtitle2">{deviceInfo.name}</Typography>
      </TableCell>
      <TableCell>
        {deviceInfo.packetsReceived}
      </TableCell>
      <TableCell>
        {deviceInfo.packetsSent}
      </TableCell>
      <TableCell>
        {deviceInfo.bytesReceived}
      </TableCell>
      <TableCell>
        {deviceInfo.bytesSent}
      </TableCell>
    </TableRow>
  );
}
