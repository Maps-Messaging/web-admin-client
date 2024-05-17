import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import {UserAttributes} from "@/generated/model";

interface UserAttributesTableProps {
  attributes: UserAttributes;
}

const UserAttributesTable: React.FC<UserAttributesTableProps> = ({ attributes }) => {
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
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserAttributesTable;
