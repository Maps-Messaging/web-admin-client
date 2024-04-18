import type {InterfaceInfo} from "@/generated/model";
import * as React from "react";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import {
  useGetInterfaceStatus
} from "@/generated/server-interface-management/server-interface-management";
import { formatNumberWithPowerUnit } from "@/helper-functions";
import TableRow from "@mui/material/TableRow";

interface NetworkInterfaceRowProps {
  key: string;
  networkInfo: InterfaceInfo;
}

export function NetworkInterfaceRow({
                                      networkInfo = {},
                                      key=''
                                      }: NetworkInterfaceRowProps): React.JSX.Element {

  const { data, error, isLoading } = useGetInterfaceStatus(networkInfo.name ||'',{
    query:{
      refetchInterval: 10000
    }
  });
  if (isLoading) return <div>Loading name...</div>;
  if (error) return <div>Error loading name: {error.message}</div>;

  return (
    <TableRow
      id={key}
    >
      <TableCell>
        <Typography variant="subtitle2">{networkInfo.name}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{networkInfo.host}:{networkInfo.port}</Typography>
      </TableCell>
      <TableCell>
        { formatNumberWithPowerUnit(data?.data.connections || 0)}
      </TableCell>
      <TableCell>
        {formatNumberWithPowerUnit(data?.data.messagesReceived || 0)}
      </TableCell>
      <TableCell>
        {formatNumberWithPowerUnit(data?.data.messagesSent || 0)}
      </TableCell>
      <TableCell>
        {formatNumberWithPowerUnit(data?.data.bytesReceived || 0)}
      </TableCell>
      <TableCell>
        {formatNumberWithPowerUnit(data?.data.bytesSent || 0)}
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{networkInfo.state}</Typography>
      </TableCell>
    </TableRow>
  );
}
