import * as React from 'react';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useGetAllDiscoveredServers } from '@/generated/discovery-management/discovery-management';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import {Paper, TableContainer} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { MinusCircle, PlusCircle } from '@phosphor-icons/react';
import {type GetAllDiscoveredServersParams, type ServicesProperties} from "@/generated/model";

const PropertiesTable: React.FC<{ properties: ServicesProperties }> = ({ properties }) => (
  <TableContainer component={Paper}>
    <Table size="small">
      <TableBody>
        {Object.entries(properties).map(([key, value]) => (
          <TableRow key={key}>
            <TableCell>{key}</TableCell>
            <TableCell>{value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default function DiscoveryDetails(): React.ReactElement {

  const params: GetAllDiscoveredServersParams = { filter: '' };
  const { data, error, isLoading } = useGetAllDiscoveredServers(params,{
    query: {
      refetchInterval: 60000,
    },
  });

  const [open, setOpen] = useState<Record<string, boolean>>({});

  const toggleOpen = (key: string) : Record<string, boolean> => {
    setOpen((prev) => {
      const newState = { ...prev, [key]: !prev[key] };
      return newState;
    });
    return open;
  };

  if (isLoading) return <div>Loading details...</div>;
  if (error) return <div>Error loading details: {error.message}</div>;

  return (
    <Stack spacing={3}>
      <Typography variant="h4">Discovered Servers</Typography>
      <TableContainer>
        <Table>
          <TableBody>
            {data?.data.map((server, index) => {
              const key = `server-${index.toString()}`;
              const mapsService = server.services?.find(service => service.protocol === 'maps');
              const link = mapsService
                ? `${mapsService.transport ?? ''}://${mapsService.addresses?.[0] ?? ''}:${mapsService.port !== undefined ? String(mapsService.port) : ''}/admin/`
                : null;

              return (
                <React.Fragment key={key}>
                  <TableRow>
                    <TableCell>
                      <div style={{display: 'flex', alignItems: 'center'}}>
                        <IconButton onClick={() => toggleOpen(key)}>
                          {open[key] ? <MinusCircle/> : <PlusCircle/>}
                        </IconButton>
                        {link ? (
                          <a href={link} target="_blank" rel="noopener noreferrer">
                            <Typography variant="subtitle2">{server.serverName} - Services: {server.services?.length}</Typography>
                          </a>
                        ) : (
                          <Typography variant="subtitle2">{server.serverName} - Services: {server.services?.length}</Typography>
                        )}
                      </div>
                      <Typography variant="subtitle2">Schema Prefix : {server.schemaPrefix} - System Topic Prefix: {server.systemTopics}</Typography>
                      <Typography variant="subtitle2">Build Date : {server.buildDate} - Version : {server.version}</Typography>

                    </TableCell>
                  </TableRow>
                  {open[key] && server.serverName && (
                    <TableRow>
                      <TableCell style={{ paddingLeft: 40 }}>
                        <Table size="small">
                          <TableBody>
                            {server?.services?.map((service) => (
                              <TableRow key={service.protocol}>
                                <TableCell>{service.protocol}</TableCell>
                                <TableCell>{service.addresses}</TableCell>
                                <TableCell>{service.port}</TableCell>
                                <TableCell>
                                  {service.properties ? (
                                    <PropertiesTable properties={service.properties} />
                                  ) : (
                                    'No properties'
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
