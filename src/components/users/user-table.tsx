'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { useSelection } from '@/hooks/use-selection';
import {UserDTO} from "@/generated/model";
import Link from "next/link";

function noop(): void {
  // do nothing
}

interface UserTableProps {
  count?: number;
  page?: number;
  rows?: UserDTO[];
  rowsPerPage?: number;
}

export function UserTable({
                                 count = 0,
                                 rows = [],
                                 page = 0,
                                 rowsPerPage = 0,
                               }: UserTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => {
    return rows.map((user) => user.uniqueId);
  }, [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  function getGroups(arr: (string | null)[]): string {
    return arr.filter((group): group is string => group !== null).join(',');
  }


  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      selectAll();
                    } else {
                      deselectAll();
                    }
                  }}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Unique Id</TableCell>
              <TableCell>Groups</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const isSelected = selected?.has(row.uniqueId);

              return (
                <TableRow hover key={row.uniqueId} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          selectOne(row.uniqueId);
                        } else {
                          deselectOne(row.uniqueId);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Link href={`/dashboard/authentication/user?username=${encodeURIComponent(row.username||'')}`} passHref>
                      <Typography variant="subtitle2">{row.username}</Typography>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{row.uniqueId}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{getGroups(row.groupList || [])}</Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        onPageChange={noop}
        onRowsPerPageChange={noop}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
