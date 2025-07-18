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

import type {EndPointSummaryDTO} from "@/generated/model";
import * as React from "react";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import {formatNumberWithPowerUnit, numberToDateString} from "@/helper-functions";
import TableRow from "@mui/material/TableRow";
import Link from "next/link";

interface ConnectionRowProps {
  key: string;
  connection: EndPointSummaryDTO;
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
        <Link href={`/dashboard/connections/connection?connectionId=${encodeURIComponent(connection.id||'')}`} passHref>
          <Typography variant="subtitle2">{connection.name}</Typography>
        </Link>

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
