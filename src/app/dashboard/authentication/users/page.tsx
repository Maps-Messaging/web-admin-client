'use client'

import * as React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserDetails from "@/components/users/user-details";
import '../../../../hostname-lookup'


const queryClient = new QueryClient();

export default function Page(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <UserDetails />
    </QueryClientProvider>
  );
}

