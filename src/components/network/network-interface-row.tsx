/*
 * Copyright [ 2020 - 2024 ] [Matthew Buckton]
 * Copyright [ 2024 - 2024 ] [Maps Messaging B.V.]
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

import type {InterfaceInfoDTO} from "@/generated/model";
import * as React from "react";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import {useGetInterfaceStatus} from "@/generated/server-interface-management/server-interface-management";
import {formatNumberWithPowerUnit} from "@/helper-functions";
import TableRow from "@mui/material/TableRow";
import Link from "next/link";
import EndPointActionController from "@/components/network/endPoint/end-point-action-controller";

interface NetworkInterfaceRowProps {
  key: string;
  networkInfo: InterfaceInfoDTO;
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
        <Link href={`/dashboard/network/endPoint?networkName=${encodeURIComponent(networkInfo.name||'')}`} passHref>
          <Typography variant="subtitle2">{networkInfo.name}</Typography>
        </Link>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{networkInfo.host}:{networkInfo.port}</Typography>
      </TableCell>
      <TableCell>
        { data?.data.connections || 0}
      </TableCell>
      <TableCell>
        {formatNumberWithPowerUnit(data?.data.totalMessagesReceived || 0)}<br/>
        {formatNumberWithPowerUnit(data?.data.messagesReceived || 0)} /sec
      </TableCell>
      <TableCell>
        {formatNumberWithPowerUnit(data?.data.totalMessagesSent || 0)}<br/>
        {formatNumberWithPowerUnit(data?.data.messagesSent || 0)} /sec
      </TableCell>
      <TableCell>
        {formatNumberWithPowerUnit(data?.data.totalBytesReceived || 0)}<br/>
        {formatNumberWithPowerUnit(data?.data.bytesReceived || 0)} /sec
      </TableCell>
      <TableCell>
        {formatNumberWithPowerUnit(data?.data.totalBytesSent || 0)}<br/>
        {formatNumberWithPowerUnit(data?.data.bytesSent || 0)} /sec
      </TableCell>
      <TableCell>
        <EndPointActionController name={networkInfo.name||''} />
      </TableCell>
    </TableRow>
  );
}
