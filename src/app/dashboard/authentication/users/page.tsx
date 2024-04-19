'use client'

import * as React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserGroupDetails from "@/components/users/user-group-details";
import '../../../../hostname-lookup'


const queryClient = new QueryClient();

export default function Page(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <UserGroupDetails />
    </QueryClientProvider>
  );
}

