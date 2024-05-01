import type {InterfaceInfo} from "@/generated/model";
import * as React from "react";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import {
  pauseInterface, resumeInterface,
  startInterface,
  stopInterface,
  useGetInterfaceStatus
} from "@/generated/server-interface-management/server-interface-management";
import { formatNumberWithPowerUnit } from "@/helper-functions";
import TableRow from "@mui/material/TableRow";
import ActionController from "@/components/general/action-controller";
import Link from "next/link";

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

  const onStart = () => {
    if(networkInfo.name) {
      startInterface(networkInfo.name);
    }
  };

  const onStop = () => {
    if(networkInfo.name) {
      stopInterface(networkInfo.name);
    }
  };

  const onPause = () => {
    if(networkInfo.name) {
      pauseInterface(networkInfo.name);
    }
  };

  const onResume = () => {
    if(networkInfo.name) {
      resumeInterface(networkInfo.name);
    }
  };


  return (
    <TableRow
      id={key}
    >
      <TableCell>
        <Link href={`/dashboard/network/endPoint?networkName=${encodeURIComponent(networkInfo.name||'')}`} passHref>
          <Typography variant="subtitle2">{networkInfo.name}</Typography>
        </Link>
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
        <ActionController
          currentState={networkInfo.state||''}
          onPause={onPause}
          onStart={onStart}
          onStop={onStop}
          onResume={onResume}
        />
      </TableCell>
    </TableRow>
  );
}
