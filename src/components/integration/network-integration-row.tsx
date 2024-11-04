import type {IntegrationInfo} from "@/generated/model";
import * as React from "react";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import { formatNumberWithPowerUnit } from "@/helper-functions";
import TableRow from "@mui/material/TableRow";
import {useGetIntegrationStatus} from "@/generated/server-integration-management/server-integration-management";
import Link from "next/link";

interface NetworkIntegrationRowProps {
  key: string;
  networkInfo: IntegrationInfo;
}

export function NetworkIntegrationRow({
                                      networkInfo = {},
                                      key=''
                                      }: NetworkIntegrationRowProps): React.JSX.Element {

  const { data, error, isLoading } = useGetIntegrationStatus(networkInfo.config?.name ||'',{
    query:{
      refetchInterval: 10000
    }
  });


  if (isLoading) return <div>Loading details...</div>;
  if (error) return <div>Error loading details: {error.message}</div>;

  return (
    <TableRow
      id={key}
    >
      <TableCell>
        <Link href={`/dashboard/integrations/connection?connectionName=${encodeURIComponent(networkInfo.config?.name||'')}`} passHref>
          <Typography variant="subtitle2">{networkInfo.config?.name}</Typography>
        </Link>

      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{networkInfo.config?.protocols}</Typography>
      </TableCell>
      <TableCell>
        { formatNumberWithPowerUnit(networkInfo.config?.protocolConfigs?.length || 0)}
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
