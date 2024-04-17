'use client'

import * as React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import '../../../hostname-lookup'
import NetworkInterfaceDetails from "@/components/network/network-interface-details";

const queryClient = new QueryClient();

export default function Page(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <NetworkInterfaceDetails />
    </QueryClientProvider>
  );
}

