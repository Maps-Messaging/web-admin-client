import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import { DeviceInfoDTO } from "@/generated/model";
import Link from "next/link";

interface DeviceInfoRowProps {
  device: DeviceInfoDTO;
}

export function DeviceInfoRow({ device }: DeviceInfoRowProps): React.JSX.Element {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow onClick={() => { setOpen(!open); }} style={{ cursor: 'pointer' }}>
        <TableCell>
          <Link href={`/dashboard/lora/name?loraName=${encodeURIComponent(device.name||'')}`} passHref>
            {device.name}
          </Link>
        </TableCell>
        <TableCell>{device.description}</TableCell>
        <TableCell>{device.type}</TableCell>
      </TableRow>
      {device.type === "sensor" && (
        <TableRow>
          <TableCell colSpan={3} style={{ paddingBottom: 0, paddingTop: 0 }}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Typography variant="body2" style={{ padding: "10px" }}>
                State: {device.state || "N/A"}
              </Typography>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
