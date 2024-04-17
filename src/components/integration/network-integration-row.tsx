import type {IntegrationInfo, InterfaceInfo} from "@/generated/model";
import * as React from "react";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import { formatNumberWithPowerUnit } from "@/helper-functions";
import TableRow from "@mui/material/TableRow";
import {useGetIntegrationStatus} from "@/generated/server-integration-management/server-integration-management";

interface NetworkIntegrationRowProps {
  key: string;
  networkInfo: IntegrationInfo;
}

export function NetworkIntegrationRow({
                                      networkInfo = {},
                                      key=''
                                      }: NetworkIntegrationRowProps): React.JSX.Element {

  const { data, error, isLoading } = useGetIntegrationStatus(networkInfo.name ||'',{
    query:{
      refetchInterval: 10000
    }
  });
  return (
    <TableRow
      id={key}
    >
      <TableCell>
        <Typography variant="subtitle2">{networkInfo.name}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{networkInfo.remoteUrl}</Typography>
      </TableCell>
      <TableCell>
        { formatNumberWithPowerUnit(networkInfo.mappings || 0)}
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
        <Typography variant="subtitle2">{data?.data.state}</Typography>
      </TableCell>
    </TableRow>
  );
}
