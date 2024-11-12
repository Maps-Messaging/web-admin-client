/*
 * Copyright [ 2020 - 2024 ] [Matthew Buckton]
 * Copyright [ 2024 - 2024 ] [Maps Messaging]
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

import type {IntegrationInfoDTO} from "@/generated/model";
import * as React from "react";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import { formatNumberWithPowerUnit } from "@/helper-functions";
import TableRow from "@mui/material/TableRow";
import {useGetIntegrationStatus} from "@/generated/server-integration-management/server-integration-management";
import Link from "next/link";

interface NetworkIntegrationRowProps {
  key: string;
  networkInfo: IntegrationInfoDTO;
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
