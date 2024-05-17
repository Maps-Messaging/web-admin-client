'use client'

import * as React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import '../../../../hostname-lookup'
import {useSearchParams} from "next/navigation";
import UserDetails from "@/components/users/user/user-details";


const queryClient = new QueryClient();

export default function Page(): React.JSX.Element {
  const searchParams = useSearchParams()
  const name = searchParams.get('username')

  return (
    <QueryClientProvider client={queryClient}>
      <UserDetails user={name||''} />
    </QueryClientProvider>
  );
}
