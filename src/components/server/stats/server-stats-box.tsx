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

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React from "react";
import {type ServerInfoDTO} from "@/generated/model";
import {useGetStats} from "@/generated/server-management/server-management";

interface ServerStatsBoxProps {
  info: ServerInfoDTO;
}

export function ServerStatsBox ({
                                  info = {},
                                   }: ServerStatsBoxProps): React.JSX.Element {


  const { data, error, isLoading } = useGetStats({
    query:{
      refetchInterval: 5000
    }
  });

  if (isLoading) return <div>Loading stats...</div>;
  if (error) return <div>Error loading stats: {error.message}</div>;

  return (

  <Card>
    <CardContent>
      <Typography variant="h6">State Info</Typography>
      <Typography variant="body2">Total Topics/Queues: {((info?.destinations || 0) ).toFixed(0)}</Typography>
      <Typography variant="body2">Storage Size: {((info?.storageSize|| 0) / 1024 / 1024).toFixed(0)} MB</Typography>
      <Typography variant="body2">Total Connections: {((data?.data.data?.totalConnections|| 0)).toFixed(0)} </Typography>
      <Typography variant="body2">Total Received: {((data?.data.data?.totalPublishedMessages|| 0)).toFixed(0)} </Typography>
      <Typography variant="body2">Total Delivered: {((data?.data.data?.totalDeliveredMessages|| 0)).toFixed(0)} </Typography>
    </CardContent>
  </Card>

);
}
