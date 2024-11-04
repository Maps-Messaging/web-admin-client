import type {SchemaConfig} from "@/generated/model";
import * as React from "react";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import TableRow from "@mui/material/TableRow";
import {jsonToDateTime} from "@/helper-functions";

interface SchemaRowProps {
  key: string;
  schema: SchemaConfig;
}

export function SchemaRow({
                            schema,
                                      key=''
                                      }: SchemaRowProps): React.JSX.Element {
  return (
    <TableRow
      id={key}
    >
      <TableCell>
        <Typography variant="subtitle2">{schema.format}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{schema.type}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{schema.uniqueId}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{jsonToDateTime(schema.creation||"")}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{schema.version || 1}</Typography>
      </TableCell>
    </TableRow>
  );
}
