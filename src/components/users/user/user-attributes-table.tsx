import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { UserDTOAttributes } from "@/generated/model";

interface UserAttributesTableProps {
  attributes: UserDTOAttributes;
}

const UserAttributesTable: React.FC<UserAttributesTableProps> = ({ attributes }) => {
  if (!attributes) {
    return (
      <Typography variant="body1">
        No attributes available.
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">Key</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Value</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(attributes).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell>{key}</TableCell>
              <TableCell>{value || 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserAttributesTable;
