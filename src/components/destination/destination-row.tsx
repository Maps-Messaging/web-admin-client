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
import * as React from "react";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import TableRow from "@mui/material/TableRow";
import {DestinationDTO} from "@/generated/model";
import Link from "next/link";

interface DestinationRowProps {
  key: string;
  destination: DestinationDTO;
}

export function DestinationRow({
                                 destination,
                                      key=''
                                    }: DestinationRowProps): React.JSX.Element {

  return (
    <TableRow
      id={key}
    >
      <TableCell>
        <Link href={`/dashboard/namespace/destination?destinationName=${encodeURIComponent(destination?.name ||'')}`} passHref>
          <Typography variant="subtitle2">{destination?.name ||''}</Typography>
        </Link>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{destination?.type ||'topic'}</Typography>
      </TableCell>
      <TableCell>
        {destination?.publishedMessages || 0}
      </TableCell>
      <TableCell>
        {destination?.deliveredMessages || 0}
      </TableCell>
      <TableCell>
        {destination?.storedMessages || 0}
      </TableCell>
      <TableCell>
        {destination?.pendingMessages || 0}
      </TableCell>
      <TableCell>
        {destination?.delayedMessages || 0}
      </TableCell>
      <TableCell>
        {destination?.expiredMessages || 0}
      </TableCell>
      <TableCell>
        {destination?.readTimeAveNs || 0}
      </TableCell>
      <TableCell>
        {destination?.writeTimeAveNs || 0}
      </TableCell>
      <TableCell>
        {destination?.deleteTimeAveNs || 0}
      </TableCell>
    </TableRow>
  );
}
