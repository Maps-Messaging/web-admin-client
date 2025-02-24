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

'use client';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import * as React from 'react';
import {useGetConnectionDetails} from '@/generated/connection-management/connection-management';
import ProtocolInformationRenderer from "@/components/connections/connection/protocol-information-renderer";

const queryClient = new QueryClient();

interface ConnectionDetailProps {
  connectionId: string;
}

export function ConnectionDetail({ connectionId = '' }: ConnectionDetailProps): React.JSX.Element {
  const request = { connectionId };
  const { data, error, isLoading } = useGetConnectionDetails(request, {
    query: { refetchInterval: 10000 },
  });

  if (error) {
    return <div>Failed to load connection details.</div>;
  }

  if (isLoading) {
    return <div>Please wait for details.</div>;
  }

  const connectionData = data?.data;

  return (
    <QueryClientProvider client={queryClient}>
      <ProtocolInformationRenderer
        protocol={connectionData?.protocolInformation || {type:'coap'}}
        endPointDetails={connectionData || {} }
      />
    </QueryClientProvider>
  );
}

export default ConnectionDetail;
