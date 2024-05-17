'use client'

import * as React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UsersDetails from "@/components/users/users-details";
import '../../../../hostname-lookup'

const queryClient = new QueryClient();

export default function Page(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <UsersDetails />
    </QueryClientProvider>
  );
}

