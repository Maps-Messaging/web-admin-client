/*
 * Copyright [ 2020 - 2024 ] [Matthew Buckton]
 * Copyright [ 2024 - 2025 ] [Maps Messaging B.V.]
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
'use client';

import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link';

import type { InterfaceInfoDTO } from '@/generated/model';
import { useGetInterfaceStatus } from '@/generated/server-interface-management/server-interface-management';
import { formatNumberWithPowerUnit } from '@/helper-functions';
import EndPointActionController from '@/components/network/endPoint/end-point-action-controller';

interface NetworkInterfaceRowProps {
  networkInfo: InterfaceInfoDTO;
}

export function NetworkInterfaceRow({
                                      networkInfo,
                                    }: NetworkInterfaceRowProps): React.JSX.Element {
  const name = networkInfo?.name ?? '';

  const { data, error, isLoading } = useGetInterfaceStatus(name, {
    query: { refetchInterval: 10000 },
  });

  if (isLoading)
    return (
      <TableRow>
        <TableCell colSpan={8}>
          <Typography variant="body2">Loading {name}…</Typography>
        </TableCell>
      </TableRow>
    );

  if (error)
    return (
      <TableRow>
        <TableCell colSpan={8}>
          <Typography color="error">
            Error loading {name}: {error.message}
          </Typography>
        </TableCell>
      </TableRow>
    );

  const stats = data?.data;

  return (
    <TableRow id={name}>
      <TableCell>
        <Link
          href={`/dashboard/network/endPoint?networkName=${encodeURIComponent(name)}`}
        >
          <Typography variant="subtitle2">{name}</Typography>
        </Link>
      </TableCell>

      <TableCell>
        <Typography variant="subtitle2">
          {networkInfo.host}:{networkInfo.port}
        </Typography>
      </TableCell>

      <TableCell>{stats?.connections ?? 0}</TableCell>

      <TableCell>
        {formatNumberWithPowerUnit(stats?.totalMessagesReceived ?? 0)}
        <br />
        {formatNumberWithPowerUnit(stats?.messagesReceived ?? 0)} /sec
      </TableCell>

      <TableCell>
        {formatNumberWithPowerUnit(stats?.totalMessagesSent ?? 0)}
        <br />
        {formatNumberWithPowerUnit(stats?.messagesSent ?? 0)} /sec
      </TableCell>

      <TableCell>
        {formatNumberWithPowerUnit(stats?.totalBytesReceived ?? 0)}
        <br />
        {formatNumberWithPowerUnit(stats?.bytesReceived ?? 0)} /sec
      </TableCell>

      <TableCell>
        {formatNumberWithPowerUnit(stats?.totalBytesSent ?? 0)}
        <br />
        {formatNumberWithPowerUnit(stats?.bytesSent ?? 0)} /sec
      </TableCell>

      <TableCell>
        <EndPointActionController name={name} />
      </TableCell>
    </TableRow>
  );
}
