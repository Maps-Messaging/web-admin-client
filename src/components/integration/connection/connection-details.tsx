'use client'

import * as React from 'react';
import Stack from '@mui/material/Stack';

import {
  useGetInterface,
} from "@/generated/server-interface-management/server-interface-management";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {EndPointStatus} from "@/components/network/endPoint/end-point-status";
import EndPointActionController from "@/components/network/endPoint/end-point-action-controller";
import {
  useGetAllIntegrationStatus,
  useGetIntegrationStatus
} from "@/generated/server-integration-management/server-integration-management";
import {ConnectionStatus} from "@/components/integration/connection/connection-status";
import TableCell from "@mui/material/TableCell";
import {formatNumberWithPowerUnit} from "@/helper-functions";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";

interface ConnectionDetailsProps {
  name: string;
}

export default function ConnectionDetails({
                                          name=''
                                        }: ConnectionDetailsProps): React.JSX.Element {

  const { data, error, isLoading } = useGetIntegrationStatus(name ||'',{
    query:{
      refetchInterval: 60000
    }
  });

  if (isLoading) return <div>Loading name...</div>;
  if (error) return <div>Error loading name: {error.message}</div>;

  return (
    <Stack spacing={3}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            <Table>
              <TableBody>
              <TableRow
                id={data?.data.interfaceName}
              >
                <TableCell>
                  Msg In: {formatNumberWithPowerUnit(data?.data.messagesReceived || 0)}
                </TableCell>
                <TableCell>
                  Msg Out: {formatNumberWithPowerUnit(data?.data.messagesSent || 0)}
                </TableCell>
                <TableCell>
                  Byte In : {formatNumberWithPowerUnit(data?.data.bytesReceived || 0)}
                </TableCell>
                <TableCell>
                  Bytes out : {formatNumberWithPowerUnit(data?.data.bytesSent || 0)}
                </TableCell>
                <TableCell>
                  State : <Typography variant="subtitle2">{data?.data.state}</Typography>
                </TableCell>
              </TableRow>
              </TableBody>
            </Table>
          </Typography>
        </CardContent>
      </Card>
      <ConnectionStatus
        status={data?.data}
      />
    </Stack>
  );
}

