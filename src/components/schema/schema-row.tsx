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

import type {SchemaConfig} from "@/generated/model";
import * as React from "react";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import TableRow from "@mui/material/TableRow";
import {jsonToDateTimeZoned} from "@/helper-functions";

interface SchemaRowProps {
  schema: SchemaConfig;
}

export function SchemaRow({
                            schema,
                          }: SchemaRowProps): React.JSX.Element {
  return (
    <TableRow
      id={schema.uniqueId}
    >
      <TableCell>
        <Typography variant="subtitle2">{schema.format}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{schema.name}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{schema.labels?.comments}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{schema.createdAt ? jsonToDateTimeZoned(schema.createdAt) : ""}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{schema.version || 1}</Typography>
      </TableCell>
    </TableRow>
  );
}
