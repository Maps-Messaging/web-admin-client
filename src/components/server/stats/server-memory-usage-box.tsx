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

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React from "react";
import {StatusMessageDTO} from "@/generated/model";

interface ServerMemoryUsageBoxProps {
  data: StatusMessageDTO;
}

export function ServerMemoryUsageBox ({
                                        data = {},
                                      }: ServerMemoryUsageBoxProps): React.JSX.Element {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Memory Usage</Typography>
        <Typography variant="body2">Total Memory: {((data?.totalMemory || 0) / 1024 / 1024).toFixed(0)} MB</Typography>
        <Typography variant="body2">Free Memory: {((data?.freeMemory|| 0) / 1024 / 1024).toFixed(0)} MB</Typography>
        <Typography variant="body2">Max Memory: {((data?.maxMemory|| 0) / 1024 / 1024).toFixed(0)} MB</Typography>
        <Typography variant="body2">&nbsp;</Typography>
      </CardContent>
    </Card>  );
}
