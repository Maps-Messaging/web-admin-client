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

import * as React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Link from "next/link";
import {LoRaEndPointInfoDTO} from "@/generated/model";

function LoRaEndPointInfoTable({ endPoints, deviceName }: { endPoints: LoRaEndPointInfoDTO[], deviceName: string }) {
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
                  <TableRow
                    key={endPoint?.nodeId}
                  >
                    <TableCell>
                      <Link href={`/dashboard/lora/name?deviceName=${encodeURIComponent(deviceName||'')}&nodeId=${encodeURIComponent(endPoint?.nodeId||'')} ` } passHref>
                        {endPoint?.nodeId}
                      </Link>
                    </TableCell>
                    <TableCell>{endPoint?.lastRSSI}</TableCell>
                    <TableCell>{endPoint?.incomingQueueSize}</TableCell>
                    <TableCell>{endPoint?.connectionSize}</TableCell>
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
