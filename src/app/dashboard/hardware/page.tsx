'use client'

import * as React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import '../../../hostname-lookup'
import {DeviceInfoTable} from "@/components/devices/device-info-table";

const queryClient = new QueryClient();

export default function Page(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <DeviceInfoTable />
    </QueryClientProvider>
  );
}

