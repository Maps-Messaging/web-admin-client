'use client'

import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NamespaceTree from "@/components/server/namespace-tree";

const queryClient = new QueryClient();

export default function NameSpacePage (): React.JSX.Element {

  return (
    <QueryClientProvider client={queryClient}>
      <NamespaceTree/>
    </QueryClientProvider>
  );
}
