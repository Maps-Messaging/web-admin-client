/*
 * Copyright [ 2020 - 2024 ] [Matthew Buckton]
 * Copyright [ 2024 - 2024 ] [Maps Messaging B.V.]
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

import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Collapse from "@mui/material/Collapse";
import {DeviceInfoDTO} from "@/generated/model";
import Link from "next/link";
import {DeviceInfoStateDialog} from "@/components/devices/device-info-state";

interface DeviceInfoRowProps {
  device: DeviceInfoDTO;
}

export function DeviceInfoRow({ device }: DeviceInfoRowProps): React.JSX.Element {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow onClick={() => { setOpen(!open); }} style={{ cursor: 'pointer' }}>
        <TableCell>
          <Link href={`/dashboard/lora/name?loraName=${encodeURIComponent(device.name||'')}`} passHref>
            {device.name}
          </Link>
        </TableCell>
        <TableCell>{device.description}</TableCell>
        <TableCell>{device.type}</TableCell>
      </TableRow>
      {device.type?.toLowerCase()  === "sensor" && (
        <TableRow>
          <TableCell colSpan={3} style={{ paddingBottom: 0, paddingTop: 0 }}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <DeviceInfoStateDialog
                stateString={device.state}
              />
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
