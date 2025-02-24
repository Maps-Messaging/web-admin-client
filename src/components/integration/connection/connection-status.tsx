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
import DataGraph from "@/components/graphs/data-graph";
import {IntegrationStatusDTO} from "@/generated/model";

interface ConnectionStatusProps {
  status?: IntegrationStatusDTO;
}

export function ConnectionStatus ({
                                  status={}
                                }: ConnectionStatusProps): React.JSX.Element {

  const [bytesReceived, setBytesReceived] = useState<number[]>([]);
  const [bytesSent, setBytesSent] = useState<number[]>([]);
  const [messagesReceived, setMessagesReceived] = useState<number[]>([]);
  const [messagesSent, setMessagesSent] = useState<number[]>([]);

  // Update arrays whenever new data is fetched
  useEffect(() :void => {
    if (status) {
      const updateArray = (prev: number[], newValue: number | undefined) => {
        if (typeof newValue !== 'number') return prev;  // skip update if newValue is undefined or invalid
        const newArray = [...prev, newValue];
        return newArray.length > 120 ? newArray.slice(newArray.length - 120) : newArray;
      };
      setBytesReceived(prev => updateArray(prev, status.bytesReceived))
      setBytesSent(prev => updateArray(prev, status.bytesSent))
      setMessagesReceived(prev => updateArray(prev,status.messagesReceived))
      setMessagesSent(prev => updateArray(prev,status.messagesSent))
    }
  }, [status]);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <DataGraph name='Bytes Read' data={bytesReceived} />
        </Grid>
        <Grid item xs={12} md={6}>
          <DataGraph name='Bytes Sent' data={bytesSent} />
        </Grid>
        <Grid item xs={12} md={6}>
          <DataGraph name='Msg Received' data={messagesReceived} />
        </Grid>
        <Grid item xs={12} md={6}>
          <DataGraph name='Msg Sent' data={messagesSent} />
        </Grid>
      </Grid>
    </Container>
  );
}

