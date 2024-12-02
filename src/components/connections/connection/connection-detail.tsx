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
