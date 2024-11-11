import * as React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { type LoRaEndPointInfo } from "@/generated/model";
import Link from "next/link";

function LoRaEndPointInfoTable({ endPoints, deviceName }: { endPoints: LoRaEndPointInfo[], deviceName: string }) {
  return (
    <>
        <Accordion key={deviceName}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Endpoint List : {deviceName}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Node ID</TableCell>
                    <TableCell>Last RSSI</TableCell>
                    <TableCell>Incoming Queue Size</TableCell>
                    <TableCell>Connection Size</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {endPoints.map((endPoint) => (
                  <TableRow>
                    <TableCell>
                      <Link href={`/dashboard/lora/name?deviceName=${encodeURIComponent(deviceName||'')}&nodeId=${encodeURIComponent(endPoint.nodeId||'')} ` } passHref>
                        {endPoint.nodeId}
                      </Link>
                    </TableCell>
                    <TableCell>{endPoint.lastRSSI}</TableCell>
                    <TableCell>{endPoint.incomingQueueSize}</TableCell>
                    <TableCell>{endPoint.connectionSize}</TableCell>
                  </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
    </>
  );
}

export default LoRaEndPointInfoTable;
