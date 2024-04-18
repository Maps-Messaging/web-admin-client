import type {EndPointDetails, InterfaceInfo} from "@/generated/model";
import * as React from "react";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import {
  useGetInterfaceStatus
} from "@/generated/server-interface-management/server-interface-management";
import {formatNumberWithPowerUnit, formatUptime, numberToDateString} from "@/helper-functions";
import TableRow from "@mui/material/TableRow";

interface ConnectionRowProps {
  key: string;
  connection: EndPointDetails;
}

export function ConnectionRow({
                                connection = {},
                                      key=''
                                      }: ConnectionRowProps): React.JSX.Element {

  return (
    <TableRow
      id={key}
    >
      <TableCell>
        <Typography variant="subtitle2">{connection.name}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{connection.user}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{connection.protocolName} - {connection.protocolVersion}</Typography>
      </TableCell>
      <TableCell>
        { numberToDateString(connection.lastRead || 0)}
      </TableCell>
      <TableCell>
        { numberToDateString(connection.lastWrite || 0)}
      </TableCell>
      <TableCell>
        {formatNumberWithPowerUnit(connection.totalBytesRead || 0)}
      </TableCell>
      <TableCell>
        {formatNumberWithPowerUnit(connection.totalBytesWritten || 0)}
      </TableCell>
      <TableCell>
        {formatNumberWithPowerUnit(connection.totalOverflow || 0)}
      </TableCell>
      <TableCell>
        {formatNumberWithPowerUnit(connection.totalUnderflow || 0)}
      </TableCell>
    </TableRow>
  );
}
