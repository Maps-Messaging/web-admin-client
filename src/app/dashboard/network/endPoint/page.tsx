'use client'

import {useSearchParams} from "next/navigation";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import * as React from "react";
import EndPointDetails from "@/components/network/endPoint/end-point-details";

const queryClient = new QueryClient();

const NetworkEndPointPage = () => {

  const searchParams = useSearchParams()
  const name = searchParams.get('networkName')

  return (
    <QueryClientProvider client={queryClient}>
      <EndPointDetails
        name={name||''}/>
    </QueryClientProvider>
  );
};

export default NetworkEndPointPage;
