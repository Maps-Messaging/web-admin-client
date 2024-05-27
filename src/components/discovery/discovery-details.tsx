import * as React from 'react';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useGetAllDiscoveredServers } from '@/generated/discovery-management/discovery-management';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import { TableContainer } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { MinusCircle, PlusCircle } from '@phosphor-icons/react';
import {type GetAllDiscoveredServersParams, ServiceData} from "@/generated/model";

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

  function getProtocolSupport(serviceData: ServiceData): string {
    let versions = '';
    if(serviceData.application === 'mqtt'){
      if( serviceData.properties?.['version 5.0']){
        versions = 'V5.0'
      }
      if( serviceData.properties?.['version 3.1.1']){
        versions += ' V3.1.1'
      }
      if( serviceData.properties?.['version 3.1']){
        versions += ' V3.1'
      }
    }
    else if(serviceData.application === 'maps'){
      versions += serviceData.properties?.['version'] || '';
    }
    return versions;
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h4">Discovered Servers</Typography>
      <TableContainer>
        <Table>
          <TableBody>
            {data?.data.map((server, index) => {
              const key = `server-${index.toString()}`;
              return (
                <React.Fragment key={key}>
                  <TableRow>
                    <TableCell>
                      <IconButton onClick={() => toggleOpen(key)}>
                        {open[key] ? <MinusCircle /> : <PlusCircle />}
                      </IconButton>
                      <Typography variant="subtitle2">{server.server}</Typography>
                    </TableCell>
                  </TableRow>
                  {open[key] && server.serviceInfo && (
                    <TableRow>
                      <TableCell style={{ paddingLeft: 40 }}>
                        <Table size="small">
                          <TableBody>
                            {server.serviceInfo.map((service) => (
                              <TableRow key={service.application}>
                                <TableCell>{service.application}</TableCell>
                                <TableCell>{service.domain}</TableCell>
                                <TableCell>{service.hostAddresses?.join(', ')}</TableCell>
                                <TableCell>{service.port}</TableCell>
                                <TableCell>{getProtocolSupport(service)}</TableCell>
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
