'use client'

import * as React from 'react';
import Stack from '@mui/material/Stack';

import {DiscoveredServers} from "@/generated/model";
import Typography from "@mui/material/Typography";
import {useGetAllDiscoveredServers} from "@/generated/discovery-management/discovery-management";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Table from "@mui/material/Table";
import {TableContainer} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {useState} from "react";
import {MinusCircle, PlusCircle} from "@phosphor-icons/react";

export default function DiscoveryDetails(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 20;

  const { data, error, isLoading } = useGetAllDiscoveredServers({
    query:{
      refetchInterval: 60000
    }
  });

  const [open, setOpen] = useState<{ [key: string]: boolean }>({});

  const toggleOpen = (key: string) => {
    setOpen(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (isLoading) return <div>Loading details...</div>;
  if (error) return <div>Error loading details: {error.message}</div>;

  const paginatedInterfaces = applyPagination((data?.data || []), page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Discovered Servers</Typography>
        </Stack>
      </Stack>
      <TableContainer>
        <Table>
          <TableBody>
            {data?.data.map((server, index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell>
                    <IconButton onClick={() => toggleOpen(`server-${index}`)}>
                      {open[`server-${index}`] ? <MinusCircle /> : <PlusCircle />}
                    </IconButton>
                    <Typography variant="subtitle2">{server.server}</Typography>
                  </TableCell>
                </TableRow>
                {open[`server-${index}`] && server.serviceInfo && (
                  <TableRow>
                    <TableCell style={{ paddingLeft: 40 }}>
                      <Table size="small">
                        <TableBody>
                          {server.serviceInfo.map((service, serviceIndex) => (
                            <TableRow key={serviceIndex}>
                              <TableCell>{service.application}</TableCell>
                              <TableCell>{service.domain}</TableCell>
                              <TableCell>{service.hostAddresses?.join(', ')}</TableCell>
                              <TableCell>{service.port}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

function applyPagination(rows: DiscoveredServers[], page: number, rowsPerPage: number): DiscoveredServers[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
