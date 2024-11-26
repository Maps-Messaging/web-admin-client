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

'use client';
import type {DestinationDTO} from "@/generated/model";
import * as React from "react";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import TableRow from "@mui/material/TableRow";
import {useGetDestinationStats} from "@/generated/destination-management/destination-management";

interface DestinationRowProps {
  key: string;
  destination: DestinationDTO;
}

export function DestinationRow({
                                 destination,
                                      key=''
                                    }: DestinationRowProps): React.JSX.Element {

  const lookup={
    destinationName:destination.name
  }
  const { data, error, isLoading } = useGetDestinationStats(lookup,{
    query:{
      refetchInterval: 10000
    }
  });

  if (isLoading) return <div>Loading topic...</div>;
  if (error) return <div>Error loading topic: {error.message}</div>;


  return (
    <TableRow
      id={key}
    >
      <TableCell>
        <Typography variant="subtitle2">{destination?.name ||''}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{destination?.type ||'topic'}</Typography>
      </TableCell>
      <TableCell>
        {data?.data.storedMessages || 0}
      </TableCell>
      <TableCell>
        {destination?.pendingMessages || 0}
      </TableCell>
      <TableCell>
        {data?.data.publishedMessages || 0}
      </TableCell>
      <TableCell>
        {data?.data.deliveredMessages || 0}
      </TableCell>
      <TableCell>
        {data?.data.delayedMessages || 0}
      </TableCell>
      <TableCell>
        {data?.data.expiredMessages || 0}
      </TableCell>
      <TableCell>
        {data?.data.readTimeAveNs || 0}
      </TableCell>
      <TableCell>
        {data?.data.writeTimeAveNs || 0}
      </TableCell>
      <TableCell>
        {data?.data.deleteTimeAveNs || 0}
      </TableCell>
    </TableRow>
  );
}
