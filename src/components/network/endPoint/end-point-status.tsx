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

'use client'

import React, {useEffect, useState} from 'react';
import Container from "@mui/material/Container";
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import DataGraph from "@/components/graphs/data-graph";
import {useGetInterfaceStatus} from "@/generated/server-interface-management/server-interface-management";

interface EndPointStatusProps {
  name: string;
}

export function EndPointStatus ({
                                  name=''
                                }: EndPointStatusProps): React.JSX.Element {


  const { data, error, isLoading } = useGetInterfaceStatus(name, {
    query:{
      refetchInterval: 2000
    }
  });

  const [bytesReceived, setBytesReceived] = useState<number[]>([]);
  const [bytesSent, setBytesSent] = useState<number[]>([]);
  const [connections, setConnections] = useState<number[]>([]);
  const [errors, setErrors] = useState<number[]>([]);
  const [messagesReceived, setMessagesReceived] = useState<number[]>([]);
  const [messagesSent, setMessagesSent] = useState<number[]>([]);

  // Update arrays whenever new data is fetched
  useEffect(() :void => {
    if (data) {
      const updateArray = (prev: number[], newValue: number | undefined) => {
        if (typeof newValue !== 'number') return prev;  // skip update if newValue is undefined or invalid
        const newArray = [...prev, newValue];
        return newArray.length > 120 ? newArray.slice(newArray.length - 120) : newArray;
      };
      setBytesReceived(prev => updateArray(prev, data.data.bytesReceived))
      setBytesSent(prev => updateArray(prev, data.data.bytesSent))
      setConnections(prev => updateArray(prev, data.data.connections))
      setErrors(prev => updateArray(prev,data.data.errors))
      setMessagesReceived(prev => updateArray(prev,data.data.messagesReceived))
      setMessagesSent(prev => updateArray(prev,data.data.messagesSent))
    }
  }, [data]);

  if (isLoading) return <div>Loading name...</div>;
  if (error) return <div>Error loading name: {error.message}</div>;


  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1" gutterBottom>
        End Point : {name}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <DataGraph name='Bytes Read/sec' data={bytesReceived} />
        </Grid>
        <Grid item xs={12} md={6}>
          <DataGraph name='Bytes Sent/sec' data={bytesSent} />
        </Grid>

        <Grid item xs={12} md={6}>
          <DataGraph name='Msg Received/sec' data={messagesReceived} />
        </Grid>
        <Grid item xs={12} md={6}>
          <DataGraph name='Msg Sent/sec' data={messagesSent} />
        </Grid>
        <Grid item xs={12} md={6}>
          <DataGraph name='Connections' data={connections} />
        </Grid>
        <Grid item xs={12} md={6}>
          <DataGraph name='Errors' data={errors} />
        </Grid>
      </Grid>
    </Container>
  );
}

