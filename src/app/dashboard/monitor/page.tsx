'use client'

import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MessagingServerDiagram from "@/components/server/messaging-server-diagram";

const queryClient = new QueryClient();

export default function StatusPage (): React.JSX.Element {

  return (
    <QueryClientProvider client={queryClient}>
      <MessagingServerDiagram/>
    </QueryClientProvider>
  );
}
