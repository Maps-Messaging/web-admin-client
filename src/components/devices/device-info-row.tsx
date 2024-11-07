import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import {DeviceInfo} from "@/generated/model";


interface DeviceInfoRowProps {
  device: DeviceInfo;
}

export function DeviceInfoRow({ device }: DeviceInfoRowProps): React.JSX.Element {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow onClick={() => setOpen(!open)} style={{ cursor: 'pointer' }}>
        <TableCell>{device.name}</TableCell>
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
